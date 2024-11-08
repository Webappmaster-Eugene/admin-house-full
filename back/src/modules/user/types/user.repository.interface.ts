import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { IRepositoryCommon } from '../../../common/types/main/slices/repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../../common/types/main/count.data';
import { UserEntity } from '../entities/user.entity';
import { UserAllInfoEntity } from '../entities/user-all-info.entity';
import type { TransactionDbClient } from '../../../common/types/transaction-prisma-client.type';
import { UserAddToWorkspaceRequestDto } from '../../../modules/user/dto/controller/add-to-workspace.dto';
import { UserAddToProjectRequestDto } from '../../../modules/user/dto/controller/add-to-project.dto';
import { UserAddToOrganizationRequestDto } from '../../../modules/user/dto/controller/add-to-organization.dto';
import { UserUpdateRolesRequestDto } from '../../../modules/user/dto/controller/update-user-roles.dto';

export interface IUserRepository extends IRepositoryCommon<UserCreateRequestDto, UserUpdateRequestDto, UserEntity> {
  getById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UserEntity>;
  getFullInfoById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UserAllInfoEntity>;
  getByEmail: (userEmail: EntityUrlParamCommand.RequestEmailParam) => Promise<UserEntity>;
  getAll: (skip?: number, take?: number) => Promise<UserEntity[]>;
  getAllCount: () => Promise<CountData>;
  create: (
    dto: UserCreateRequestDto,
    roleUuids: EntityUrlParamCommand.RequestUuidParam[],
    hashedPassword: string,
    transactionDbClient: TransactionDbClient,
  ) => Promise<UserEntity>;
  updateById: (userId: EntityUrlParamCommand.RequestUuidParam, dto: UserUpdateRequestDto) => Promise<UserEntity>;
  updateUserRolesById: (userId: EntityUrlParamCommand.RequestUuidParam, dto: UserUpdateRolesRequestDto) => Promise<UserEntity>;
  deleteById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UserEntity>;
  addExistedWorkspaceToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UserEntity>;
  addExistedHandbookToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UserEntity>;
  addUserToWorkspaceById: (dto: UserAddToWorkspaceRequestDto) => Promise<UserEntity>;
  addUserToOrganizationById: (dto: UserAddToOrganizationRequestDto) => Promise<UserEntity>;
  addUserToProjectById: (dto: UserAddToProjectRequestDto) => Promise<UserEntity>;
}
