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

export interface IUserController
  extends IControllerCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserGetResponseDto,
    UserGetAllResponseDto,
    UserCreateResponseDto,
    UserUpdateResponseDto,
    void,
    void,
    EntityUrlParamCommand.RequestParam
  > {
  getByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<UserGetResponseDto | null>>;
  getAllEP: () => Promise<
    UniversalExternalResponse<UserGetAllResponseDto[] | null>
  >;
  createEP: (
    dto: UserCreateRequestDto,
  ) => Promise<UniversalExternalResponse<UserCreateResponseDto>>;
  updateByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UniversalExternalResponse<UserUpdateResponseDto>>;
  deleteByIdEP: (
    id: EntityUrlParamCommand.RequestParam,
  ) => Promise<UniversalExternalResponse<UserDeleteResponseDto>>;
}
