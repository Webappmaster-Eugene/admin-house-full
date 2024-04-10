import { IControllerCommon } from '../../../common/types/main/slices/controller.interface';
import {
  UserCreateRequestDto,
  UserCreateResponseDto,
} from '../dto/controller/create-user.dto';
import {
  UserUpdateRequestDto,
  UserUpdateResponseDto,
} from '../dto/controller/update-user.dto';
import { UserGetResponseDto } from '../dto/controller/get-user.dto';
import { UserGetAllResponseDto } from '../dto/controller/get-all-users.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { UserDeleteResponseDto } from '../dto/controller/delete-user.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';

export interface IUserController
  extends IControllerCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserGetResponseDto,
    UserGetAllResponseDto,
    UserCreateResponseDto,
    UserUpdateResponseDto,
    UserDeleteResponseDto
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<UserGetResponseDto | null>>;
  getByEmailEP: (
    email: EntityUrlParamCommand.RequestEmailParam,
  ) => Promise<UniversalExternalResponse<UserGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<UserGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<UniversalExternalResponse<UserCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<UserUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalExternalResponse<UserDeleteResponseDto>>;
  getCurrentUserEP: (
    userInfoFromJWT: IJWTPayload,
  ) => Promise<UniversalExternalResponse<UserGetResponseDto | null>>;
}
