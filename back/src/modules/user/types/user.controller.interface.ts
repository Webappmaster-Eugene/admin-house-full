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
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { UserDeleteResponseDto } from '../dto/controller/delete-user.dto';
import { IJWTPayload } from '../../../common/types/jwt.payload.interface';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { WorkspaceGetResponseDto } from '../../workspace/dto/controller/get-workspace.dto';
import { AddUserToWorkspaceRequestDto } from '../dto/controller/add-to-workspace.dto';

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
    userId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<UserGetResponseDto>;
  getByEmailEP: (
    userEmail: EntityUrlParamCommand.RequestEmailParam,
    urlParams: IUrlParams,
  ) => Promise<UserGetResponseDto>;
  getAllEP: (urlParams: IUrlParams) => Promise<UserGetAllResponseDto>;
  createEP: (
    dto: UserCreateRequestDto,
    urlParams: IUrlParams,
    roleId: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<UserCreateResponseDto>;
  updateByIdEP: (
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
    urlParams: IUrlParams,
  ) => Promise<UserUpdateResponseDto>;
  deleteByIdEP: (
    userId: EntityUrlParamCommand.RequestUuidParam,
    urlParams: IUrlParams,
  ) => Promise<UserDeleteResponseDto>;
  getCurrentUserEP: (
    userInfoFromJWT: IJWTPayload,
    urlParams: IUrlParams,
  ) => Promise<UserGetResponseDto>;
  addUserToManagerWorkspaceEP: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
    urlParams: IUrlParams,
  ) => Promise<WorkspaceGetResponseDto>;
}
