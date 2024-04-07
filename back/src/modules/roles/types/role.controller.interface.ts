import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
import {
  RoleCreateRequestDto,
  RoleCreateResponseDto,
} from '../dto/controller/create-project.dto';
import {
  RoleUpdateRequestDto,
  RoleUpdateResponseDto,
} from '../dto/controller/update-project.dto';
import { RoleGetResponseDto } from '../dto/controller/get-project.dto';
import { RoleGetAllResponseDto } from '../dto/controller/get-all-projects.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { RoleDeleteResponseDto } from '../dto/controller/delete-project.dto';

export interface IRoleController
  extends IControllerCommon<
    RoleCreateRequestDto,
    RoleUpdateRequestDto,
    RoleGetResponseDto,
    RoleGetAllResponseDto,
    RoleCreateResponseDto,
    RoleUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalExternalResponse<RoleGetResponseDto | null>>;
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
    id: EntityUrlParamCommand.RequestParam,
    dto: RoleUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<RoleUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<RoleDeleteResponseDto>>;
}
