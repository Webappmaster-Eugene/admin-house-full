import { Inject, Injectable } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IUserRepository } from './types/user.repository.interface';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { EntityUrlParamCommand } from 'libs/contracts';
import { CountData } from '../../common/types/main/count.data';
import { UserEntity } from './entities/user.entity';
import { KFI } from '../../common/utils/di';
import { UserAllInfoEntity } from './entities/user-all-info.entity';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { existenceUserEntityHandler } from './lib/user-entity-existance.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { UserAddToOrganizationRequestDto } from 'src/modules/user/dto/controller/add-to-organization.dto';
import { UserAddToWorkspaceRequestDto } from 'src/modules/user/dto/controller/add-to-workspace.dto';
import { UserAddToProjectRequestDto } from 'src/modules/user/dto/controller/add-to-project.dto';
import { Handbook, Organization, Project, Role, Workspace } from '.prisma/client';
import { UserUpdateRolesRequestDto } from 'src/modules/user/dto/controller/update-user-roles.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UserEntity> {
    try {
      const findedUser = await this.databaseService.user.findUnique({
        where: {
          uuid: userId,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(findedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getFullInfoById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UserAllInfoEntity> {
    try {
      const findedUser = await this.databaseService.user.findUnique({
        where: {
          uuid: userId,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(findedUser, UserAllInfoEntity, EntityName.USER) as UserAllInfoEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getByEmail(userEmail: EntityUrlParamCommand.RequestEmailParam): Promise<UserEntity> {
    try {
      const findedUser = await this.databaseService.user.findUnique({
        where: {
          email: userEmail,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceUserEntityHandler(findedUser);
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<UserEntity[]> {
    limitTakeHandler(take);

    try {
      const allUsers = await this.databaseService.user.findMany({
        take,
        skip,
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(allUsers, UserEntity, EntityName.USER) as UserEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.user.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: UserCreateRequestDto,
    rolesUuids: EntityUrlParamCommand.RequestUuidParam[],
    hashedPassword: string,
    transactionDbClient: TransactionDbClient = this.databaseService,
  ): Promise<UserEntity> {
    try {
      const { email, phone, firstName, secondName, address, info, documents, avatar } = dto;

      const newUser = await transactionDbClient.user.create({
        data: {
          email,
          phone,
          firstName,
          secondName,
          password: hashedPassword,
          address,
          info,
          documents,
          avatar,
          roles: {
            connect: rolesUuids.map(roleUuid => ({ uuid: roleUuid })) || [],
          },
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(newUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(userId: EntityUrlParamCommand.RequestUuidParam, dto: UserUpdateRequestDto): Promise<UserEntity> {
    try {
      const { phone, firstName, secondName, address, info, documents, avatar } = dto;

      const updatedUser = await this.databaseService.user.update({
        where: {
          uuid: userId,
        },
        data: {
          phone,
          firstName,
          secondName,
          address,
          info,
          documents,
          avatar,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(updatedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateUserRolesById(userId: EntityUrlParamCommand.RequestUuidParam, dto: UserUpdateRolesRequestDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.databaseService.user.update({
        where: {
          uuid: userId,
        },
        data: {
          roles: {
            connect: dto.rolesIds.map(roleId => ({ idRole: roleId })) || [],
          },
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(updatedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UserEntity> {
    try {
      const deletedUser = await this.databaseService.user.delete({
        where: {
          uuid: userId,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });
      return existenceEntityHandler(deletedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient: TransactionDbClient = this.databaseService,
  ): Promise<UserEntity> {
    try {
      const updatedManager = await transactionDbClient.user.update({
        where: {
          uuid: workspaceCreatorId,
        },
        data: {
          creatorOfWorkspaceUuid: workspaceId,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      // const userInfo = updatedManager as unknown as UserEntity;
      // userInfo.roleName = updatedManager.role?.name;
      return existenceEntityHandler(updatedManager, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async addExistedHandbookToManager(
    handbookCreatorId: EntityUrlParamCommand.RequestUuidParam,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    transactionDbClient: TransactionDbClient = this.databaseService,
  ): Promise<UserEntity> {
    try {
      const updatedManager = await transactionDbClient.user.update({
        where: {
          uuid: handbookCreatorId,
        },
        data: {
          handbookManagerUuid: handbookId,
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(updatedManager, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async addUserToWorkspaceById({ uuid, memberOfWorkspaces }: UserAddToWorkspaceRequestDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.databaseService.user.update({
        where: {
          uuid,
        },
        data: {
          memberOfWorkspaces: {
            connect: {
              uuid: memberOfWorkspaces[0].uuid,
            },
          },
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(updatedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async addUserToOrganizationById({ uuid, memberOfOrganizations }: UserAddToOrganizationRequestDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.databaseService.user.update({
        where: {
          uuid,
        },
        data: {
          membersOfOrganizations: {
            connect: {
              uuid: memberOfOrganizations[0].uuid,
            },
          },
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      // const userInfo = updatedUser as unknown as UserEntity;
      // userInfo.roleName = updatedUser.role?.name;
      return existenceEntityHandler(updatedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async addUserToProjectById({ uuid, memberOfProjects }: UserAddToProjectRequestDto): Promise<UserEntity> {
    try {
      const updatedUser = await this.databaseService.user.update({
        where: {
          uuid,
        },
        data: {
          membersOfProjects: {
            connect: {
              uuid: memberOfProjects[0].uuid,
            },
          },
        },
        include: {
          roles: true,
          customerOfProjects: true,
          handbookManager: true,
          responsibleManagerOfProjects: true,
          creatorOfWorkspace: true,
          leaderOfOrganizations: true,
          memberOfWorkspaces: true,
          membersOfOrganizations: true,
          membersOfProjects: true,
        },
      });

      return existenceEntityHandler(updatedUser, UserEntity, EntityName.USER) as UserEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
