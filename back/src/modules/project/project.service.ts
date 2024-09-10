import { Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from './entities/project.entity';
import { KFI } from '../../common/utils/di';
import { IProjectService } from './types/project.service.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IOrganizationService } from '../organization/types/organization.service.interface';
import { IProjectRepository } from './types/project.repository.interface';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { ProjectCreateRequestDto } from './dto/controller/create-project.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ProjectUpdateRequestDto } from './dto/controller/update-project.dto';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    @Inject(KFI.PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    // @Inject(KFI.ORGANIZATION_SERVICE)
    // private readonly organizationService: IOrganizationService,
  ) {}

  async getById(projectId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<ProjectEntity>> {
    const concreteOrganization = await this.projectRepository.getById(projectId);
    return new InternalResponse<ProjectEntity>(concreteOrganization);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<ProjectEntity[] | null>> {
    const { skip, take } = queryParams;
    const allOrganizations = await this.projectRepository.getAll(skip, take);
    return new InternalResponse<ProjectEntity[]>(allOrganizations);
  }

  async getAllInWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<ProjectEntity[] | null>> {
    const { skip, take } = queryParams;
    const allOrganizations = await this.projectRepository.getAllInWorkspace(workspaceId, skip, take);
    return new InternalResponse<ProjectEntity[]>(allOrganizations);
  }

  async getAllInOrganization(
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<ProjectEntity[] | null>> {
    const { skip, take } = queryParams;
    const allOrganizations = await this.projectRepository.getAllInOrganization(organizationId, skip, take);
    return new InternalResponse<ProjectEntity[]>(allOrganizations);
  }

  async create(
    dto: ProjectCreateRequestDto,
    userInfoFromJWT: IJWTPayload,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const { email, uuid } = userInfoFromJWT;
    dto.customerMail = dto.customerMail ? dto.customerMail : email;

    const createdProject = await this.projectRepository.create(dto, uuid, organizationId);
    return new InternalResponse<ProjectEntity>(createdProject);
  }

  async updateById(
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: ProjectUpdateRequestDto,
  ): Promise<UniversalInternalResponse<ProjectEntity>> {
    const updatedProject = await this.projectRepository.updateById(projectId, dto);
    return new InternalResponse<ProjectEntity>(updatedProject);
  }

  async deleteById(projectId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<ProjectEntity>> {
    const deletedOrganization = await this.projectRepository.deleteById(projectId);
    return new InternalResponse<ProjectEntity>(deletedOrganization);
  }
}
