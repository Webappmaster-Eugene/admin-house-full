import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { UserEntity } from '../entities/user.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { AddUserToWorkspaceRequestDto } from '../dto/controller/add-to-workspace.dto';

export interface IUserService
  extends IServiceCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserEntity
  > {
  getById: (
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  getByEmail: (
    userEmail: EntityUrlParamCommand.RequestEmailParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  getAll: () => Promise<UniversalInternalResponse<UserEntity[]>>;
  create: (
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  updateById: (
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  deleteById: (
    userId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addExistedWorkspaceToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addExistedHandbookToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addUserToManagerWorkspace: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
}
