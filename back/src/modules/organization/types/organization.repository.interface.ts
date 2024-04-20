import { OrganizationCreateRequestDto } from '../dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto } from '../dto/controller/update-organization.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { OrganizationEntity } from '../entities/organization.entity';

export interface IOrganizationRepository
  extends IRepositoryCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationEntity
  > {
  getById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<OrganizationEntity>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<OrganizationEntity>;
  getAllCount: () => Promise<CountData>;
  getAll: () => Promise<OrganizationEntity[]>;
  create: (
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<OrganizationEntity>;
  updateById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<OrganizationEntity>;
  deleteById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<OrganizationEntity>;
}
