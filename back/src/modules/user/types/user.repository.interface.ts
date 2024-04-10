import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../../common/types/main/count.data';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository
  extends IRepositoryCommon<
    UserCreateRequestDto,
    UserUpdateRequestDto,
    UserEntity
  > {
  getById: (id: EntityUrlParamCommand.RequestUuidParam) => Promise<UserEntity>;
  getByEmail: (
    email: EntityUrlParamCommand.RequestEmailParam,
  ) => Promise<UserEntity>;
  getAll: () => Promise<UserEntity[]>;
  getAllCount: () => Promise<CountData>;
  create: (
    dto: UserCreateRequestDto,
    // roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UserEntity>;
  updateById: (
    id: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ) => Promise<UserEntity>;
  deleteById: (
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UserEntity>;
  addExistedWorkspaceToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UserEntity>;
}
