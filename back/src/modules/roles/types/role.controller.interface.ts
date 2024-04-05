import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants, Prisma } from '@prisma/client';
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
  ) => UniversalExternalResponse<RoleGetResponseDto | null>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => UniversalExternalResponse<RoleGetResponseDto | null>;
  getAllEP: () => UniversalExternalResponse<RoleGetAllResponseDto[] | null>;
  createEP: (
    dto: RoleCreateRequestDto,
  ) => UniversalExternalResponse<RoleCreateResponseDto>;
  updateByIdEP: (
    id: EntityGetCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => UniversalExternalResponse<RoleUpdateResponseDto>;
  deleteByIdsEP: (
    ids: EntityGetCommand.RequestParam[],
  ) => UniversalExternalResponse<Prisma.BatchPayload>;
}
