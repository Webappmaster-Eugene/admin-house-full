import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IUserRepository } from './types/user.repository.interface';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { UserEntity } from './entities/user.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KFI } from '../../common/utils/di';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { BackendErrorNames, BackendPErrorCodes, InternalError } from '../../common/errors/errors.backend';
import { UserAllInfoEntity } from './entities/user-all-info.entity';
import { TransactionDbClient } from '../../common/types/transaction-prisma-client.type';
import { USER_TAKE_LIMIT } from '../../common/consts/take-quantity.limitation';

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
      });

      if (findedUser) {
        return new UserEntity(findedUser);
      } else {
        throw new NotFoundException({
          message: `User with id=${userId} not found`,
          description: 'User from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getAllInfoById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UserAllInfoEntity> {
    try {
      const findedUser = await this.databaseService.user.findUnique({
        where: {
          uuid: userId,
        },
        include: {
          role: true,
          creatorOfWorkspace: true,
          memberOfWorkspace: true,
        },
      });

      if (findedUser) {
        return new UserAllInfoEntity(findedUser);
      } else {
        throw new NotFoundException({
          message: `User with id=${userId} not found`,
          description: 'User from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getByEmail(userEmail: EntityUrlParamCommand.RequestEmailParam): Promise<UserEntity> {
    try {
      const findedUser = await this.databaseService.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (findedUser) {
        return new UserEntity(findedUser);
      } else {
        throw new UnauthorizedException({
          message: `User credentials are wrong`,
          description: 'Failed to get user with these credentials',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      if (error instanceof UnauthorizedException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getAll(skip = 0, take = 3): Promise<UserEntity[]> {
    if (take > USER_TAKE_LIMIT) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR));
    }

    try {
      const allUsers = await this.databaseService.user.findMany({ take, skip });
      return toEntityArray(allUsers, UserEntity);
    } catch (error: unknown) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
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
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async create(
    dto: UserCreateRequestDto,
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
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
          roleUuid,
        },
      });
      return new UserEntity(newUser);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_CONFLICT_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.PRISMA_CONFLICT_ERROR, error));
      }
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
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
      });
      return new UserEntity(updatedUser);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async deleteById(userId: EntityUrlParamCommand.RequestUuidParam): Promise<UserEntity> {
    try {
      const deletedUser = await this.databaseService.user.delete({
        where: {
          uuid: userId,
        },
      });
      return new UserEntity(deletedUser);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    console.log(workspaceCreatorId, workspaceId);

    try {
      const updatedManager = await this.databaseService.user.update({
        where: {
          uuid: workspaceCreatorId,
        },
        data: {
          creatorOfWorkspaceUuid: workspaceId,
        },
      });
      return new UserEntity(updatedManager);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async addExistedHandbookToManager(
    handbookCreatorId: EntityUrlParamCommand.RequestUuidParam,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    try {
      const updatedManager = await this.databaseService.user.update({
        where: {
          uuid: handbookCreatorId,
        },
        data: {
          handbookManagerUuid: handbookId,
        },
      });
      return new UserEntity(updatedManager);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }
}
