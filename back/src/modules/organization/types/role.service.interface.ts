import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { OrganizationCreateRequestDto } from '../dto/controller/create-organization.dto';
import { OrganizationUpdateRequestDto } from '../dto/controller/update-organization.dto';
import { EUserTypeVariants } from '@prisma/client';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { OrganizationEntity } from '../entities/organization.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IOrganizationService
  extends IServiceCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationEntity,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getById: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalInternalResponse<OrganizationEntity | null>>;
  getByValue: (
    value: EUserTypeVariants,
  ) => Promise<UniversalInternalResponse<OrganizationEntity | null>>;
  getAll: () => Promise<UniversalInternalResponse<OrganizationEntity[] | null>>;
  create: (
    dto: OrganizationCreateRequestDto,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  updateById: (
    id: EntityUrlParamCommand.RequestParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  deleteById: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalInternalResponse<OrganizationEntity>>;
  checkIsAdminSecretKey: (key: string) => boolean;
}
