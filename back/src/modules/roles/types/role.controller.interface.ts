import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import {
  RoleCreateRequestDto,
  RoleCreateResponseDto,
} from '../dto/create-role.dto';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from '../dto/update-role.dto';
import { RoleGetResponseDto } from '../dto/get-role.dto';
import { RoleGetAllResponseDto } from '../dto/get-all-roles.dto';
import { UniversalControllerResponse } from '../../../common/types/responses/universal-controller-response.interface';
import { USER_TYPE_VARIANTS } from '../../../common/consts/consts';
import { EntityGetCommand } from '../../../../libs/contracts/commands/common/get-param.command';

export interface IRoleController
  extends IControllerCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleGetResponseDto,
    RoleGetAllResponseDto,
    RoleCreateResponseDto,
    RoleUpdateResponseDto
  > {
  getByIdEP: (
    id: EntityGetCommand.RequestParam,
  ) => UniversalControllerResponse<RoleGetResponseDto | null>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => UniversalControllerResponse<RoleGetResponseDto | null>;
  getAllEP: () => UniversalControllerResponse<RoleGetAllResponseDto[] | null>;
  createEP: (
    dto: RoleCreateRequestDto,
  ) => UniversalControllerResponse<RoleCreateResponseDto>;
  updateByIdEP: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => UniversalControllerResponse<RoleUpdateResponseDto>;
  deleteByIdsEP: (
    ids: EntityGetCommand.RequestParam[],
  ) => UniversalControllerResponse<Prisma.BatchPayload>;
}
