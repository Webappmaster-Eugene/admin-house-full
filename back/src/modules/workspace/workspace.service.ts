import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WorkspaceEntity } from './entities/workspace.entity';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IWorkspaceRepository } from './types/workspace.repository.interface';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { WorkspaceUpdateRequestDto } from './dto/controller/update-workspace.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { WorkspaceChangeOwnerRequestDto } from './dto/controller/change-owner-workspace.dto';
import { WorkspaceAddUserToManagerRequestDto } from './dto/controller/add-to-manager-workspace.dto';
import { IWorkspaceService } from './types/workspace.service.interface';
import { WorkspaceCreateRequestDto } from './dto/controller/create-workspace.dto';
import { ILogger } from '../../common/types/main/logger.interface';

@Injectable()
export class WorkspaceService implements IWorkspaceService {
  constructor(
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_REPOSITORY)
    private readonly workspaceRepository: IWorkspaceRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER)
    private readonly logger: ILogger,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const findedWorkspace = await this.workspaceRepository.getById(id);
      return new InternalResponse<WorkspaceEntity>(findedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_NOT_GETTED_BY_ID,
      );
    }
  }

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const findedWorkspace =
        await this.workspaceRepository.getByManagerId(managerId);
      return new InternalResponse<WorkspaceEntity>(findedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_NOT_GETTED_BY_MANAGER_ID,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<WorkspaceEntity[] | null>> {
    try {
      const allWorkspaces = await this.workspaceRepository.getAll();
      return new InternalResponse<WorkspaceEntity[]>(allWorkspaces);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.ALL_WORKSPACES_NOT_GETTED,
      );
    }
  }

  // для создания Workspace нужно указать id пользователя (менеджера), для которого создается Workspace
  async create(
    dto: WorkspaceCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const createdWorkspace = await this.workspaceRepository.create(
        dto,
        userId,
      );
      return new InternalResponse<WorkspaceEntity>(createdWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_NOT_CREATED,
      );
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceUpdateRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const updatedWorkspace = await this.workspaceRepository.updateById(
        id,
        dto,
      );
      return new InternalResponse<WorkspaceEntity>(updatedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const deletedWorkspace = await this.workspaceRepository.deleteById(id);
      return new InternalResponse<WorkspaceEntity>(deletedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_NOT_DELETED,
      );
    }
  }

  async changeWorkspaceOwner(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceChangeOwnerRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const updatedWorkspace =
        await this.workspaceRepository.changeWorkspaceOwner(id, dto);
      return new InternalResponse<WorkspaceEntity>(updatedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_OWNER_NOT_CHANGED,
      );
    }
  }

  async addUserToManagerWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: WorkspaceAddUserToManagerRequestDto,
  ): Promise<UniversalInternalResponse<WorkspaceEntity | null>> {
    try {
      const updatedWorkspace =
        await this.workspaceRepository.addUserToManagerWorkspace(
          workspaceId,
          dto,
        );
      return new InternalResponse<WorkspaceEntity>(updatedWorkspace);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.WORKSPACE.WORKSPACE_OWNER_NOT_CHANGED,
      );
    }
  }
}
