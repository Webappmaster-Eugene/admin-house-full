import { Inject, Injectable } from '@nestjs/common';
import { OrganizationEntity } from './entities/organization.entity';
import { KFI } from '../../common/utils/di';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { IQueryParams } from '../../common/decorators/query-params.decorator';

@Injectable()
export class OrganizationService implements IOrganizationService {
  constructor(
    @Inject(KFI.ORGANIZATION_REPOSITORY)
    private readonly organizationRepository: IOrganizationRepository,
    @Inject(KFI.WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
  ) {}

  async getById(organizationId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const concreteOrganization = await this.organizationRepository.getById(organizationId);
    return new InternalResponse(concreteOrganization);
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const concreteOrganization = await this.organizationRepository.getByManagerId(managerId);
    return new InternalResponse(concreteOrganization);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<OrganizationEntity[]>> {
    const { skip, take } = queryParams;
    const allOrganizations = await this.organizationRepository.getAll(skip, take);
    //const allOrganizationsCount = await this.roleRepository.getAllCount();
    return new InternalResponse(allOrganizations);
  }

  async getAllInWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    queryParams?: IQueryParams,
  ): Promise<UniversalInternalResponse<OrganizationEntity[]>> {
    const { skip, take } = queryParams;
    const allOrganizationsInWorkspace = await this.organizationRepository.getAllInWorkspace(workspaceId, skip, take);
    return new InternalResponse(allOrganizationsInWorkspace);
  }

  async create(
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const createdOrganization = await this.organizationRepository.create(dto, userId, workspaceId);
    return new InternalResponse(createdOrganization);
  }

  async updateById(
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const updatedOrganization = await this.organizationRepository.updateById(organizationId, dto);
    return new InternalResponse(updatedOrganization);
  }

  async deleteById(organizationId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const deletedOrganization = await this.organizationRepository.deleteById(organizationId);
    return new InternalResponse(deletedOrganization);
  }
}
