import { HttpException, Inject, Injectable } from '@nestjs/common';
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

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getByEmail(
    email: EntityUrlParamCommand.RequestEmailParam,
  ): Promise<UserEntity> {
    const findedUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return new UserEntity(findedUser);
  }

  async getById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    const findedUser = await this.prismaService.user.findUnique({
      where: {
        uuid: id,
      },
      select: {
        uuid: true,
        firstName: true,
        email: true,
        phone: true,
        address: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    return new UserEntity(findedUser);
  }

  async getAll(): Promise<UserEntity[]> {
    const allUsers = await this.prismaService.user.findMany();
    return toEntityArray<UserEntity>(allUsers, UserEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.user.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async create(dto: UserCreateRequestDto): Promise<UserEntity> {
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
      roleUuid,
    } = dto;

    try {
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
          roleUuid,
          avatar,
        },
      });

      return new UserEntity(newUser);
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(error.message, 500);
      }
      throw new HttpException(error.message, 500);
    }
  }

  async updateById(id: string, dto: UserUpdateRequestDto): Promise<UserEntity> {
    const { phone, firstName, secondName, address, info, documents, avatar } =
      dto;

    const updatedUser = await this.prismaService.user.update({
      where: {
        uuid: id,
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
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        uuid: id,
      },
    });
    return new UserEntity(deletedUser);
  }

  async addExistedWorkspaceToManager(
    workspaceCreatorId: EntityUrlParamCommand.RequestUuidParam,
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UserEntity> {
    const updatedManager = await this.prismaService.user.update({
      where: {
        uuid: workspaceCreatorId,
      },
      data: {
        creatorOfWorkspaceUuid: workspaceId,
      },
    });

    return new UserEntity(updatedManager);
  }
}
