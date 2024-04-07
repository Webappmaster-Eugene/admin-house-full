import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
import {
  OrganizationCreateRequestDto,
  OrganizationCreateResponseDto,
} from '../dto/controller/create-organization.dto';
import {
  OrganizationUpdateRequestDto,
  OrganizationUpdateResponseDto,
} from '../dto/controller/update-organization.dto';
import { OrganizationGetResponseDto } from '../dto/controller/get-organization.dto';
import { OrganizationGetAllResponseDto } from '../dto/controller/get-all-organizations.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { OrganizationDeleteResponseDto } from '../dto/controller/delete-organization.dto';

export interface IOrganizationController
  extends IControllerCommon<
    OrganizationCreateRequestDto,
    OrganizationUpdateRequestDto,
    OrganizationGetResponseDto,
    OrganizationGetAllResponseDto,
    OrganizationCreateResponseDto,
    OrganizationUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalExternalResponse<OrganizationGetResponseDto | null>>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => Promise<UniversalExternalResponse<OrganizationGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<OrganizationGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: OrganizationCreateRequestDto,
  ) => Promise<UniversalExternalResponse<OrganizationCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
    dto: OrganizationUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<OrganizationUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<OrganizationDeleteResponseDto>>;
}
