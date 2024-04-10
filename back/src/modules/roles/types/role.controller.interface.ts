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
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { RoleDeleteResponseDto } from '../dto/controller/delete-role.dto';
import { RoleEntity } from '../entities/role.entity';

export interface IRoleController {
  // getByIdEP: (
  //   id: EntityUrlParamCommand.RequestNumberParam,
  // ) => Promise<RoleEntity>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => Promise<UniversalExternalResponse<RoleGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<RoleGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: RoleCreateRequestDto,
  ) => Promise<UniversalExternalResponse<RoleCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<RoleUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<RoleDeleteResponseDto>>;
}
