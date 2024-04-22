import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IUserRepository } from './types/user.repository.interface';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { UserEntity } from './entities/user.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
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
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getByEmail(
    userEmail: EntityUrlParamCommand.RequestEmailParam,
  ): Promise<UserEntity> {
    try {
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (findedUser) {
        return new UserEntity(findedUser);
      } else {
        //   throw new NotFoundException({
        //     message: `User with email=${userEmail} not found`,
        //     description: 'User from your request did not found in the database',
        //   });
        throw new UnauthorizedException({
          message: `User credentials are wrong`,
          description: 'Failed to get user with these credentials',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      if (error instanceof UnauthorizedException) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.INVALID_CREDENTIALS),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAll(): Promise<UserEntity[]> {
    try {
      const allUsers = await this.prismaService.user.findMany();
      return toEntityArray<UserEntity>(allUsers, UserEntity);
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.prismaService.user.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async create(
    dto: UserCreateRequestDto,
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    try {
      const {
        email,
        phone,
        firstName,
        secondName,
        password,
        address,
        info,
        documents,
        avatar,
      } = dto;
      const newUser = await this.prismaService.user.create({
        data: {
          email,
          phone,
          firstName,
          secondName,
          password,
          address,
          info,
          documents,
          avatar,
          roleUuid,
        },
      });
      return new UserEntity(newUser);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(
            BackendErrorNames.CONFLICT_ERROR,
            jsonStringify(error),
          ),
        );
      }
      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async updateById(
    userId: EntityUrlParamCommand.RequestUuidParam,
    dto: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    try {
      const { phone, firstName, secondName, address, info, documents, avatar } =
        dto;

      const updatedUser = await this.prismaService.user.update({
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
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async deleteById(
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: {
          uuid: userId,
        },
      });
      return new UserEntity(deletedUser);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    console.log(workspaceCreatorId, workspaceId);

    try {
      const updatedManager = await this.prismaService.user.update({
        where: {
          uuid: workspaceCreatorId,
        },
        data: {
          creatorOfWorkspaceUuid: workspaceId,
        },
      });
      return new UserEntity(updatedManager);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }

  async addExistedHandbookToManager(
    handbookCreatorId: EntityUrlParamCommand.RequestUuidParam,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    try {
      const updatedManager = await this.prismaService.user.update({
        where: {
          uuid: handbookCreatorId,
        },
        data: {
          handbookManagerUuid: handbookId,
        },
      });
      return new UserEntity(updatedManager);
    } catch (error: unknown) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new InternalResponse(
          null,
          false,
          new InternalError(BackendErrorNames.NOT_FOUND, jsonStringify(error)),
        );
      }

      throw new InternalResponse(
        null,
        false,
        new InternalError(
          BackendErrorNames.INTERNAL_ERROR,
          jsonStringify(error),
        ),
      );
    }
  }
}
