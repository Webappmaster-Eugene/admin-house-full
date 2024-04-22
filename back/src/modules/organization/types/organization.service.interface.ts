import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { OrganizationCreateRequestDto } from '../dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto } from '../dto/controller/update-organization.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { OrganizationEntity } from '../entities/organization.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IOrganizationService
  extends IServiceCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationEntity
  > {
  getById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  getByManagerId: (
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  getAll: () => Promise<UniversalInternalResponse<OrganizationEntity[]>>;
  create: (
    dto: OrganizationCreateRequestDto,
    userId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  updateById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  deleteById: (
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
}
