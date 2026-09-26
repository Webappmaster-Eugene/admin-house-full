import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { IPrismaService } from '../types/main/prisma.interface';
import { ILogger } from '../types/main/logger.interface';
import { BACKEND_ERRORS, BackendErrorNames } from '../errors/errors-description.backend';
import { ExternalResponse } from '../types/responses/universal-external-response.interface';

type OwnershipRequest = {
  params?: Record<string, string | undefined>;
  body?: unknown;
};

/**
 * DOC Проверяет, что сущности из URL принадлежат workspace из того же URL:
 * организация — этому workspace, проект — этой организации, а организация,
 * в которую переносят проект (body.organizationUuid), — тоже этому workspace.
 * Роль проверяют WorkspaceCreatorGuard/WorkspaceMembersGuard; этот guard ставится после них
 * и закрывает подмену id чужой организации или проекта при своём workspaceId.
 * Отвечает 404, чтобы не раскрывать существование чужих сущностей.
 */
@Injectable()
export class WorkspaceEntityOwnershipGuard implements CanActivate {
  constructor(
    @Inject(KFI.PRISMA_SERVICE) private readonly databaseService: IPrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<OwnershipRequest>();
    const { workspaceId, organizationId, projectId } = request.params ?? {};

    this.assertUuid('workspaceId', workspaceId);

    if (organizationId !== undefined) {
      this.assertUuid('organizationId', organizationId);
      const organization = await this.databaseService.organization.findFirst({
        where: { uuid: organizationId, workspaceUuid: workspaceId },
        select: { uuid: true },
      });
      if (!organization) {
        this.throwNotFound(`Организация ${organizationId} не найдена в workspace ${workspaceId}`);
      }
    }

    if (projectId !== undefined) {
      this.assertUuid('projectId', projectId);
      if (organizationId === undefined) {
        this.throwBadRequest('Для проверки проекта в URL нужен organizationId');
      }
      const project = await this.databaseService.project.findFirst({
        where: { uuid: projectId, organizationUuid: organizationId },
        select: { uuid: true },
      });
      if (!project) {
        this.throwNotFound(`Проект ${projectId} не найден в организации ${organizationId}`);
      }
    }

    const targetOrganizationId = this.extractTargetOrganizationId(request.body);
    if (targetOrganizationId !== undefined && targetOrganizationId !== organizationId) {
      this.assertUuid('organizationUuid', targetOrganizationId);
      const targetOrganization = await this.databaseService.organization.findFirst({
        where: { uuid: targetOrganizationId, workspaceUuid: workspaceId },
        select: { uuid: true },
      });
      if (!targetOrganization) {
        this.throwNotFound(`Организация ${targetOrganizationId} для переноса проекта не найдена в workspace ${workspaceId}`);
      }
    }

    return true;
  }

  // DOC перенос проекта: PUT проекта принимает organizationUuid в теле
  private extractTargetOrganizationId(body: unknown): string | undefined {
    if (!body || typeof body !== 'object' || !('organizationUuid' in body)) {
      return undefined;
    }
    const value = (body as { organizationUuid?: unknown }).organizationUuid;
    if (value === undefined || value === null) {
      return undefined;
    }
    return String(value);
  }

  private assertUuid(paramName: string, value: string | undefined): asserts value is string {
    // DOC любая версия UUID — как ParseUUIDPipe в контроллерах; защищает запрос к колонке @db.Uuid
    if (!value || !isUUID(value, 'all')) {
      this.throwBadRequest(`${paramName} должен быть валидным UUID, получено: "${value}"`);
    }
  }

  private throwBadRequest(message: string): never {
    this.throwError(BackendErrorNames.BAD_REQUEST, { name: 'Invalid entity UUID', message });
  }

  private throwNotFound(message: string): never {
    this.throwError(BackendErrorNames.NOT_FOUND, { name: 'Entity is not in workspace', message });
  }

  private throwError(
    errorName: BackendErrorNames.BAD_REQUEST | BackendErrorNames.NOT_FOUND,
    details: { name: string; message: string },
  ): never {
    const description = BACKEND_ERRORS.STANDARD_ERRORS[errorName];
    this.logger.error(description.error.description, details);
    const response = new ExternalResponse(null, description.httpCode, description.error.description, [details]);
    throw new HttpException(response, response.statusCode);
  }
}
