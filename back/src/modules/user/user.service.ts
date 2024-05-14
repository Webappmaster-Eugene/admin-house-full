import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { IUserRepository } from './types/user.repository.interface';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { IUserService } from './types/user.service.interface';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { KFI } from '../../common/utils/di';
import { IHandbookService } from '../handbook/types/handbook.service.interface';
import * as argon2 from 'argon2';
import { AddUserToWorkspaceRequestDto } from './dto/controller/add-to-workspace.dto';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { CACHE_KEYS } from '../../common/consts/cache-keys';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { cacheGetter } from '../../common/helpers/cache-getter';
import { cacheSetter } from '../../common/helpers/cache-setter';
import { cacheRemover } from '../../common/helpers/cache-remover';
import { UserAllInfoEntity } from './entities/user-all-info.entity';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { dataInternalExtractor } from '../../common/helpers/data-internal.extractor';
import { cacheRemoverBatch } from '../../common/helpers/cache-remover.batch';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(KFI.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(KFI.ROLE_SERVICE)
    private readonly roleService: IRoleService,
    @Inject(KFI.WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    @Inject(KFI.HANDBOOK_SERVICE)
    private readonly handbookService: IHandbookService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<UserEntity>> {
    const cachedInfo = await cacheGetter<UserEntity>(this.cacheManager, userId);
    if (!cachedInfo) {
      const concreteUser = await this.userRepository.getById(userId);
      await cacheSetter(this.cacheManager, userId, concreteUser);
      return new InternalResponse(concreteUser);
    }
    return new InternalResponse(cachedInfo);
  }

  async getFullInfoById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<UserAllInfoEntity>> {
    const cachedInfo = await cacheGetter<UserAllInfoEntity>(this.cacheManager, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`);
    if (!cachedInfo) {
      const concreteUser = await this.userRepository.getFullInfoById(userId);
      await cacheSetter(this.cacheManager, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, concreteUser);
      return new InternalResponse(concreteUser);
    }
    return new InternalResponse(cachedInfo);
  }

  async getByEmail(userEmail: EntityUrlParamCommand.RequestEmailParam): Promise<UniversalInternalResponse<UserEntity>> {
    const cachedInfo = await cacheGetter<UserEntity>(this.cacheManager, userEmail);
    if (!cachedInfo) {
      const concreteUser = await this.userRepository.getByEmail(userEmail);
      await cacheSetter(this.cacheManager, userEmail, concreteUser);
      return new InternalResponse(concreteUser);
    }
    return new InternalResponse(cachedInfo);
  }

  async getAll(queryParams?: IQueryParams): Promise<UniversalInternalResponse<UserEntity[]>> {
    const cachedInfo = await cacheGetter<UserEntity[]>(this.cacheManager, CACHE_KEYS.USER_ALL);
    if (!cachedInfo) {
      const { skip, take } = queryParams;
      console.log(skip, take);
      const allUsers = await this.userRepository.getAll(skip, take);
      await cacheSetter(this.cacheManager, CACHE_KEYS.USER_ALL, allUsers);
      return new InternalResponse(allUsers);
    }
    return new InternalResponse(cachedInfo);
  }

  async create(
    dto: UserCreateRequestDto,
    roleId?: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    await cacheRemover(this.cacheManager, CACHE_KEYS.USER_ALL);

    const roleNumberId = roleId ? roleId : ROLE_IDS.CUSTOMER_ROLE_ID;

    const role = await this.roleService.getById(roleNumberId);

    const hashedPassword = await argon2.hash(dto.password);
    const roleUuid = dataInternalExtractor(role).uuid;

    await this.databaseService.$transaction(async transactionDbClient => {
      const createdUser = await this.userRepository.create(dto, roleUuid, hashedPassword, transactionDbClient);
      await cacheRemoverBatch(this.cacheManager, [CACHE_KEYS.USER_ALL]);

      if (roleNumberId === 2) {
        const newManagerWorkspace = await this.workspaceService.create(
          { name: null, description: null },
          createdUser.uuid,
          transactionDbClient,
        );

        const newWorkspaceInfo = dataInternalExtractor(newManagerWorkspace);

        const newManagerHandbook = await this.handbookService.create(
          {
            name: null,
            description: null,
            canCustomerView: false,
            workspaceUuid: newWorkspaceInfo.uuid,
          },
          createdUser.uuid,
          transactionDbClient,
        );

        const newHandbookInfo = dataInternalExtractor(newManagerHandbook);

        await this.workspaceService.updateById(
          newWorkspaceInfo.uuid,
          {
            handbookOfWorkspaceUuid: newHandbookInfo.uuid,
          },
          transactionDbClient,
        );

        await this.addExistedWorkspaceToManager(createdUser.uuid, newWorkspaceInfo.uuid, transactionDbClient);

        const newUserWithWorkspaceAndHandbook = await this.addExistedHandbookToManager(
          createdUser.uuid,
          newHandbookInfo.uuid,
          transactionDbClient,
        );
        const { data } = newUserWithWorkspaceAndHandbook;
        return new InternalResponse(data);
      }
      return new InternalResponse(createdUser);
    });
    // проверить, в каких случаях отрабатывает это исключение
    throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
  }

  async updateById(
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUser = await this.userRepository.updateById(userId, dto);
    await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);
    return new InternalResponse(updatedUser);
  }

  async deleteById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UniversalInternalResponse<UserEntity>> {
    const deletedUser = await this.userRepository.deleteById(userId);
    await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);
    return new InternalResponse(deletedUser);
  }
  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUserWithWorkspace = await this.userRepository.addExistedWorkspaceToManager(
      workspaceCreatorId,
      workspaceId,
      transactionDbClient,
    );
    await cacheRemoverBatch(this.cacheManager, [
      workspaceCreatorId,
      `${CACHE_KEYS.USER_FULL_INFO}userId${workspaceCreatorId}`,
      CACHE_KEYS.USER_ALL,
    ]);
    return new InternalResponse(updatedUserWithWorkspace);
  }

  async addExistedHandbookToManager(
    handbookCreatorId: EntityUrlParamCommand.RequestUuidParam,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient?: TransactionDbClient,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUserWithHandbook = await this.userRepository.addExistedHandbookToManager(
      handbookCreatorId,
      handbookId,
      transactionDbClient,
    );
    await cacheRemoverBatch(this.cacheManager, [
      handbookCreatorId,
      `${CACHE_KEYS.USER_FULL_INFO}userId${handbookCreatorId}`,
      CACHE_KEYS.USER_ALL,
    ]);
    return new InternalResponse(updatedUserWithHandbook);
  }

  async addUserToManagerWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const userToAddingId = dto.uuid;
    const findedUser = await this.userRepository.getById(userToAddingId);

    if (!findedUser.memberOfWorkspaceUuid) {
      const dtoToUpdateUser = { memberOfWorkspaceUuid: workspaceId };
      const updatedUser = await this.userRepository.updateById(userToAddingId, dtoToUpdateUser);
      await cacheRemoverBatch(this.cacheManager, [
        userToAddingId,
        `${CACHE_KEYS.USER_FULL_INFO}userId${userToAddingId}`,
        CACHE_KEYS.USER_ALL,
      ]);
      return new InternalResponse(updatedUser);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }
  }

  async addUserToManagerOrganization(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const userToAddingId = dto.uuid;
    const findedUser = await this.userRepository.getById(userToAddingId);

    if (findedUser.memberOfWorkspaceUuid === workspaceId) {
      const dtoToUpdateUser = { memberOfOrganizationUuid: organizationId };
      const updatedUser = await this.userRepository.updateById(userToAddingId, dtoToUpdateUser);
      await cacheRemoverBatch(this.cacheManager, [
        userToAddingId,
        `${CACHE_KEYS.USER_FULL_INFO}userId${userToAddingId}`,
        CACHE_KEYS.USER_ALL,
      ]);
      return new InternalResponse(updatedUser);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }
  }

  async addUserToManagerProject(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
    dto: AddUserToWorkspaceRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const userToAddingId = dto.uuid;
    const findedUser = await this.userRepository.getById(userToAddingId);

    if (findedUser.memberOfWorkspaceUuid === workspaceId && findedUser.memberOfOrganizationUuid === organizationId) {
      const dtoToUpdateUser = { memberOfProjectUuid: projectId };
      const updatedUser = await this.userRepository.updateById(userToAddingId, dtoToUpdateUser);
      await cacheRemoverBatch(this.cacheManager, [
        userToAddingId,
        `${CACHE_KEYS.USER_FULL_INFO}userId${userToAddingId}`,
        CACHE_KEYS.USER_ALL,
      ]);
      return new InternalResponse(updatedUser);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }
  }
}
