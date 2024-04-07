import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { UserCreateRequestDto } from './dto/controller/create-user.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IUserRepository } from './types/user.repository.interface';
import { UserUpdateRequestDto } from './dto/controller/update-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { UserEntity } from './entities/user.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('IPrismaService') private readonly prismaService: IPrismaService,
  ) {}

  async create({
    name,
    description,
  }: UserCreateRequestDto): Promise<UserEntity> {
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        description,
      },
    });
    return new UserEntity(newUser);
  }

  async updateById(
    id: string,
    { description }: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });
    return new UserEntity(updatedUser);
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

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<UserEntity> {
    const deletedUser = await this.prismaService.user.delete({
      where: {
        uuid: id,
      },
    });
    return new UserEntity(deletedUser);
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<UserEntity> {
    console.log(id);
    console.log(typeof id);
    const concreteUser = await this.prismaService.user.findUnique({
      where: {
        idUser: id,
      },
    });
    console.log(concreteUser);

    return new UserEntity(concreteUser);
  }

  async getByValue(value: EUserTypeVariants): Promise<UserEntity> {
    const concreteUser = await this.prismaService.user.findUnique({
      where: {
        name: value,
      },
    });

    return new UserEntity(concreteUser);
  }
}
