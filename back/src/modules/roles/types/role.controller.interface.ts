import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
import {
  RoleCreateRequestDto,
  RoleCreateResponseDto,
} from '../dto/controller/create-role.dto';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from '../dto/controller/update-role.dto';
import { RoleGetResponseDto } from '../dto/controller/get-role.dto';
import { RoleGetAllResponseDto } from '../dto/controller/get-all-roles.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { RoleDeleteResponseDto } from '../dto/controller/delete-role.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';

export interface IRoleController
  extends IControllerCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleGetResponseDto,
    RoleGetAllResponseDto,
    RoleCreateResponseDto,
    RoleUpdateResponseDto,
    RoleDeleteResponseDto
  > {
  getByIdEP: (
    roleId: EntityUrlParamCommand.RequestNumberParam,
    urlParams: IUrlParams,
  ) => Promise<RoleGetResponseDto>;
  getByValueEP: (
    roleName: EUserTypeVariants,
    urlParams: IUrlParams,
  ) => Promise<RoleGetResponseDto>;
  getAllEP: (urlParams?: IUrlParams) => Promise<RoleGetAllResponseDto>;
  createEP: (
    dto: RoleCreateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<RoleCreateResponseDto>;
  updateByIdEP: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<RoleUpdateResponseDto>;
  deleteByIdEP: (
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<RoleDeleteResponseDto>;
}
