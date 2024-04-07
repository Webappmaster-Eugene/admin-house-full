import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import { EUserTypeVariants } from '@prisma/client';
import {
  AuthCreateRequestDto,
  AuthCreateResponseDto,
} from '../dto/controller/auth.register.dto';
import {
  AuthUpdateRequestDto,
  AuthUpdateResponseDto,
} from '../dto/controller/update-role.dto';
import { AuthGetResponseDto } from '../dto/controller/get-role.dto';
import { AuthGetAllResponseDto } from '../dto/controller/get-all-roles.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { AuthDeleteResponseDto } from '../dto/controller/delete-role.dto';

export interface IAuthController
  extends IControllerCommon<
    AuthCreateRequestDto,
    AuthUpdateRequestDto,
    AuthGetResponseDto,
    AuthGetAllResponseDto,
    AuthCreateResponseDto,
    AuthUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam,
    EntityUrlParamCommand.RequestParamNumber
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParamNumber,
  ) => Promise<UniversalExternalResponse<AuthGetResponseDto | null>>;
  getByValueEP: (
    value: EUserTypeVariants,
  ) => Promise<UniversalExternalResponse<AuthGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<AuthGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: AuthCreateRequestDto,
  ) => Promise<UniversalExternalResponse<AuthCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
    dto: AuthUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<AuthUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<AuthDeleteResponseDto>>;
}
