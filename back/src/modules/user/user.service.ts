import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { IWorkspaceService } from '../workspace/types/workspace.service.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { IUserRepository } from './types/user.repository.interface';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { IUserService } from './types/user.service.interface';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { KFI } from '../../common/utils/di';
import { IHandbookService } from '../handbook/types/handbook.service.interface';
import * as argon2 from 'argon2';
import { UserAddToWorkspaceRequestDto } from './dto/controller/add-to-workspace.dto';
import { BackendErrorNames, InternalError } from '../../common/errors/errors-description.backend';
import { CACHE_KEYS } from '../../common/consts/cache-keys';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { cacheGetter } from '../../common/helpers/cashe/cache-getter';
import { cacheSetter } from '../../common/helpers/cashe/cache-setter';
import { UserAllInfoEntity } from './entities/user-all-info.entity';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IQueryParams } from '../../common/decorators/query-params.decorator';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { cacheRemoverBatch } from '../../common/helpers/cashe/cache-remover.batch';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';
import { UserAddToProjectRequestDto } from '../../modules/user/dto/controller/add-to-project.dto';
import { UserAddToOrganizationRequestDto } from '../../modules/user/dto/controller/add-to-organization.dto';
import { IProjectService } from '../../modules/project/types/project.service.interface';
import { IOrganizationService } from '../../modules/organization/types/organization.service.interface';
import { UserUpdateRolesRequestDto } from '../../modules/user/dto/controller/update-user-roles.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(KFI.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(KFI.ROLE_SERVICE)
    private readonly roleService: IRoleService,
    @Inject(KFI.WORKSPACE_SERVICE)
    private readonly workspaceService: IWorkspaceService,
    @Inject(KFI.ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
    @Inject(KFI.PROJECT_SERVICE)
    private readonly projectService: IProjectService,
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
      const concreteUser: UserAllInfoEntity = await this.userRepository.getFullInfoById(userId);
      await cacheSetter(this.cacheManager, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, concreteUser);
      return new InternalResponse<UserAllInfoEntity>(concreteUser);
    } else {
      return new InternalResponse(cachedInfo);
    }
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
      const { skip, take } = queryParams || {};
      const allUsers = await this.userRepository.getAll(skip, take);
      await cacheSetter(this.cacheManager, CACHE_KEYS.USER_ALL, allUsers);
      return new InternalResponse(allUsers);
    }
    return new InternalResponse(cachedInfo);
  }

  async create(
    dto: UserCreateRequestDto,
    roleIds: EntityUrlParamCommand.RequestNumberParam[],
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const roles = await Promise.all(
      roleIds.map(async roleId => {
        const data = await this.roleService.getById(roleId);
        const roleEntity = dataInternalExtractor(data);
        return roleEntity;
      }),
    );
    const rolesUuids = roles.map(role => role.uuid);
    const hashedPassword = await argon2.hash(dto.password);

    try {
      const resultOfTransaction = await this.databaseService.$transaction(async transactionDbClient => {
        const createdUser = await this.userRepository.create(dto, rolesUuids, hashedPassword, transactionDbClient);

        await cacheRemoverBatch(this.cacheManager, [CACHE_KEYS.USER_ALL]);

        if (roles.some(role => role.idRole === 2)) {
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
          const userWithWPAndHB = dataInternalExtractor(newUserWithWorkspaceAndHandbook);
          return new InternalResponse(userWithWPAndHB);
        }
        return new InternalResponse(createdUser);
      });
      return resultOfTransaction;
    } catch (error) {
      throw error;
    }

    //FIXME проверить, в каких случаях отрабатывает это исключение
    //throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
  }

  async updateById(
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const updatedUser = await this.userRepository.updateById(userId, dto);
    await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);
    return new InternalResponse(updatedUser);
  }

  async updateUserRolesById(
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRolesRequestDto,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = dataInternalExtractor(await this.getById(userId));
    const userExistedRolesIds = findedUser.roles.map(role => role.idRole);
    userExistedRolesIds.map(userExistedRolesId => {
      if (dto.rolesIds.includes(userExistedRolesId)) {
        throw new InternalResponse(new InternalError(BackendErrorNames.USER_ALREADY_HAS_THE_SAME_ROLE));
      }
    });

    const updatedUser = await this.userRepository.updateUserRolesById(userId, dto);
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
    const findedUser = dataInternalExtractor(await this.getById(workspaceCreatorId));
    if (findedUser.creatorOfWorkspace) {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }

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
    const findedUser = dataInternalExtractor(await this.getById(handbookCreatorId));
    if (findedUser.handbookManagerUuid) {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }

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

  async addUserToWorkspace(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(userId);
    const findedUserWorkspacesUuids = findedUser.memberOfWorkspaces.map(workspace => workspace.uuid);
    if (findedUserWorkspacesUuids.includes(workspaceId)) {
      throw new InternalResponse(new InternalError(BackendErrorNames.USER_IS_ALREADY_IN_THIS_GROUP_ENTITY));
    }

    const workspace = dataInternalExtractor(await this.workspaceService.getById(workspaceId));

    const dtoToUpdateUser: UserAddToWorkspaceRequestDto = { uuid: userId, memberOfWorkspaces: [workspace] };

    const updatedUser = await this.userRepository.addUserToWorkspaceById(dtoToUpdateUser);
    await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);

    return new InternalResponse(updatedUser);
  }

  async addUserToOrganization(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(userId);
    const findedUserOrganisationsUuids = findedUser.membersOfOrganizations.map(organization => organization.uuid);
    if (findedUserOrganisationsUuids.includes(organizationId)) {
      throw new InternalResponse(new InternalError(BackendErrorNames.USER_IS_ALREADY_IN_THIS_GROUP_ENTITY));
    }

    if (findedUser.memberOfWorkspaces.map(workspace => workspace.uuid).includes(workspaceId)) {
      const organizationEntity = dataInternalExtractor(await this.organizationService.getById(organizationId));

      const dtoToUpdateUser: UserAddToOrganizationRequestDto = { uuid: userId, memberOfOrganizations: [organizationEntity] };
      const updatedUser = await this.userRepository.addUserToOrganizationById(dtoToUpdateUser);
      await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);

      return new InternalResponse(updatedUser);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }
  }

  async addUserToProject(
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    projectId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<UserEntity>> {
    const findedUser = await this.userRepository.getById(userId);
    const findedUserProjectsUuids = findedUser.membersOfProjects.map(project => project.uuid);
    if (findedUserProjectsUuids.includes(projectId)) {
      throw new InternalResponse(new InternalError(BackendErrorNames.USER_IS_ALREADY_IN_THIS_GROUP_ENTITY));
    }

    if (
      findedUser.memberOfWorkspaces.map(workspace => workspace.uuid).includes(workspaceId) &&
      findedUser.membersOfOrganizations.map(organization => organization.uuid).includes(organizationId)
    ) {
      const project = dataInternalExtractor(await this.projectService.getById(projectId));
      const dtoToUpdateUser: UserAddToProjectRequestDto = { uuid: userId, memberOfProjects: [project] };

      const updatedUser = await this.userRepository.addUserToProjectById(dtoToUpdateUser);
      await cacheRemoverBatch(this.cacheManager, [userId, `${CACHE_KEYS.USER_FULL_INFO}userId${userId}`, CACHE_KEYS.USER_ALL]);
      return new InternalResponse(updatedUser);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.WORKSPACE_MISMATCH));
    }
  }
}
