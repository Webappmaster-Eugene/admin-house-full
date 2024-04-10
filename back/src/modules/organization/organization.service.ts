import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrganizationEntity } from './entities/organization.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ILogger } from '../../common/types/main/logger.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_ORGANIZATION_REPOSITORY)
    private readonly organizationRepository: IOrganizationRepository,
    @Inject(KEYS_FOR_INJECTION.I_WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<OrganizationEntity | null>> {
    try {
      const concreteOrganization =
        await this.organizationRepository.getById(id);
      return new InternalResponse<OrganizationEntity>(concreteOrganization);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ORGANIZATION_NOT_GETTED_BY_ID,
      );
    }
  }

  async getByManagerId(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<OrganizationEntity | null>> {
    try {
      const concreteOrganization =
        await this.organizationRepository.getByManagerId(id);
      return new InternalResponse<OrganizationEntity>(concreteOrganization);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ORGANIZATION_NOT_GETTED_BY_ID,
      );
    }
  }

  async getAll(): Promise<
    UniversalInternalResponse<OrganizationEntity[] | null>
  > {
    try {
      const allOrganizations = await this.organizationRepository.getAll();
      //const allOrganizationsCount = await this.roleRepository.getAllCount();
      return new InternalResponse<OrganizationEntity[]>(allOrganizations);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ALL_ORGANIZATIONS_NOT_GETTED,
      );
    }
  }

  async create(
    dto: OrganizationCreateRequestDto,
    userInfo: IJWTPayload,
  ): Promise<UniversalInternalResponse<OrganizationEntity | null>> {
    try {
      const findedWorkspace = await this.workspaceService.getByManagerId(
        userInfo.uuid,
      );
      const workspaceId = findedWorkspace.data.uuid;
      const createdOrganization = await this.organizationRepository.create(
        dto,
        userInfo.uuid,
        workspaceId,
      );
      return new InternalResponse<OrganizationEntity>(createdOrganization);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ORGANIZATION_NOT_CREATED,
      );
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    try {
      const updatedOrganization = await this.organizationRepository.updateById(
        id,
        dto,
      );
      return new InternalResponse<OrganizationEntity>(updatedOrganization);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ORGANIZATION_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    try {
      const deletedOrganization =
        await this.organizationRepository.deleteById(id);
      return new InternalResponse<OrganizationEntity>(deletedOrganization);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.ORGANIZATION.ORGANIZATION_NOT_DELETED,
      );
    }
  }
}
