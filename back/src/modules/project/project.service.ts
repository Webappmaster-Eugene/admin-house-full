import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProjectEntity } from './entities/project.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IProjectService } from './types/project.service.interface';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IOrganizationService } from '../organization/types/organization.service.interface';
import { IProjectRepository } from './types/project.repository.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(KEYS_FOR_INJECTION.I_ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity | null>> {
    try {
      const concreteOrganization = await this.projectRepository.getById(id);
      return new InternalResponse<ProjectEntity>(concreteOrganization);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.PROJECT.PROJECT_NOT_GETTED_BY_ID,
      );
    }
  }

  async getAll(): Promise<UniversalInternalResponse<ProjectEntity[] | null>> {
    try {
      const allOrganizations = await this.projectRepository.getAll();
      //const allOrganizationsCount = await this.roleRepository.getAllCount();
      return new InternalResponse<ProjectEntity[]>(allOrganizations);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.PROJECT.ALL_PROJECTS_NOT_GETTED,
      );
    }
  }

  async create(
    dto: ProjectCreateRequestDto,
    userInfo: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity | null>> {
    try {
      const { email } = userInfo;
      const finalCustomerMail = dto.customerMail ? dto.customerMail : email;
      dto.customerMail = finalCustomerMail;

      const createdProject = await this.projectRepository.create(
        dto,
        userInfo.uuid,
        organizationId,
      );
      return new InternalResponse<ProjectEntity>(createdProject);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.PROJECT.PROJECT_NOT_CREATED,
      );
    }
  }

  async updateById(
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ): Promise<UniversalInternalResponse<ProjectEntity | null>> {
    try {
      const updatedProject = await this.projectRepository.updateById(id, dto);
      return new InternalResponse<ProjectEntity>(updatedProject);
    } catch (error) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.PROJECT.PROJECT_NOT_UPDATED,
      );
    }
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity | null>> {
    try {
      const deletedOrganization = await this.projectRepository.deleteById(id);
      return new InternalResponse<ProjectEntity>(deletedOrganization);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.PROJECT.PROJECT_NOT_DELETED,
      );
    }
  }
}
