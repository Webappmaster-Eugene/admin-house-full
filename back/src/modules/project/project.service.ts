import { Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from './entities/project.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IProjectService } from './types/project.service.interface';
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
  ) {}

  async getById(
    projectId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const concreteOrganization =
      await this.projectRepository.getById(projectId);
    return new InternalResponse<ProjectEntity>(concreteOrganization);
  }

  async getAll(): Promise<UniversalInternalResponse<ProjectEntity[] | null>> {
    const allOrganizations = await this.projectRepository.getAll();
    return new InternalResponse<ProjectEntity[]>(allOrganizations);
  }

  async create(
    dto: ProjectCreateRequestDto,
    userInfoFromJWT: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const { email, uuid } = userInfoFromJWT;
    dto.customerMail = dto.customerMail ? dto.customerMail : email;

    const createdProject = await this.projectRepository.create(
      dto,
      uuid,
      organizationId,
    );
    return new InternalResponse<ProjectEntity>(createdProject);
  }

  async updateById(
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const updatedProject = await this.projectRepository.updateById(
      projectId,
      dto,
    );
    return new InternalResponse<ProjectEntity>(updatedProject);
  }

  async deleteById(
    projectId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const deletedOrganization =
      await this.projectRepository.deleteById(projectId);
    return new InternalResponse<ProjectEntity>(deletedOrganization);
  }
}
