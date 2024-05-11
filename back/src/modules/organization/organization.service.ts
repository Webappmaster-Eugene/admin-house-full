import { Inject, Injectable, Param } from '@nestjs/common';
import { OrganizationEntity } from './entities/organization.entity';
import { KFI } from '../../common/utils/di';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { IOrganizationRepository } from './types/organization.repository.interface';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationCreateRequestDto } from './dto/controller/create-organization.dto';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { OrganizationUpdateRequestDto } from './dto/controller/update-organization.dto';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';

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
    return new InternalResponse<OrganizationEntity>(concreteOrganization);
  }

  async getByManagerId(managerId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const concreteOrganization = await this.organizationRepository.getByManagerId(managerId);
    return new InternalResponse<OrganizationEntity>(concreteOrganization);
  }

  async getAll(): Promise<UniversalInternalResponse<OrganizationEntity[]>> {
    const allOrganizations = await this.organizationRepository.getAll();
    //const allOrganizationsCount = await this.roleRepository.getAllCount();
    return new InternalResponse<OrganizationEntity[]>(allOrganizations);
  }

  async create(
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    console.log(dto, userId, workspaceId);
    const createdOrganization = await this.organizationRepository.create(dto, userId, workspaceId);
    return new InternalResponse<OrganizationEntity>(createdOrganization);
  }

  async updateById(
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const updatedOrganization = await this.organizationRepository.updateById(organizationId, dto);
    return new InternalResponse<OrganizationEntity>(updatedOrganization);
  }

  async deleteById(organizationId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<OrganizationEntity>> {
    const deletedOrganization = await this.organizationRepository.deleteById(organizationId);
    return new InternalResponse<OrganizationEntity>(deletedOrganization);
  }
}
