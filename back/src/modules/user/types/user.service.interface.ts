import { IServiceCommon } from '../../../common/types/main/slices/service.interface';
import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { UserUpdateRequestDto } from '../dto/controller/update-user.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { UserEntity } from '../entities/user.entity';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';
import { AddUserToWorkspaceRequestDto } from '../dto/controller/add-to-workspace.dto';
import { AddUserToOrganizationRequestDto } from '../dto/controller/add-to-organization.dto';
import { AddUserToProjectRequestDto } from '../dto/controller/add-to-project.dto';
import { UserAllInfoEntity } from '../entities/user-all-info.entity';
import { IQueryParams } from '../../../common/decorators/query-params.decorator';
import { TransactionDbClient } from '../../../common/types/transaction-prisma-client.type';

export interface IUserService extends IServiceCommon<UserCreateRequestDto, UserUpdateRequestDto, UserEntity> {
  getById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<UserEntity>>;
  getFullInfoById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<UserAllInfoEntity>>;
  getByEmail: (userEmail: EntityUrlParamCommand.RequestEmailParam) => Promise<UniversalInternalResponse<UserEntity>>;
  getAll: (queryParams?: IQueryParams) => Promise<UniversalInternalResponse<UserEntity[]>>;
  create: (dto: UserCreateRequestDto, roleId?: EntityUrlParamCommand.RequestNumberParam) => Promise<UniversalInternalResponse<UserEntity>>;
  updateById: (userId: EntityUrlParamCommand.RequestUuidParam, dto: UserUpdateRequestDto) => Promise<UniversalInternalResponse<UserEntity>>;
  deleteById: (userId: EntityUrlParamCommand.RequestUuidParam) => Promise<UniversalInternalResponse<UserEntity>>;
  addExistedWorkspaceToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addExistedHandbookToManager: (
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addUserToManagerWorkspace: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addUserToManagerOrganization: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToOrganizationRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
  addUserToManagerProject: (
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToProjectRequestDto,
  ) => Promise<UniversalInternalResponse<UserEntity>>;
}
