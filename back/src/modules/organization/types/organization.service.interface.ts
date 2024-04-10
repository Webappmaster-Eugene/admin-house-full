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
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity | null>>;
  getByManagerId: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<OrganizationEntity[] | null>>;
  create: (
    dto: OrganizationCreateRequestDto,
    userInfo: IJWTPayload,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
}
