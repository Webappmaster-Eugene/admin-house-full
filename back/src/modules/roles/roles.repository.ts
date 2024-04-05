import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityGetCommand } from '../../../libs/contracts/commands/common/get-param.command';
import { CountData } from '../../common/types/main/count.data';
import { RoleEntity } from './entities/role.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(@Inject() private readonly prismaService: IPrismaService) {}

  async create({
    name,
    description,
  }: RoleCreateRequestDto): Promise<RoleEntity> {
    const newRole = await this.prismaService.role.create({
      data: {
        name,
        description,
      },
    });
    return new RoleEntity(newRole);
  }

  async updateById(
    id: string,
    { description }: RoleUpdateRequestDto,
  ): Promise<RoleEntity> {
    const updatedRole = await this.prismaService.role.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });
    return new RoleEntity(updatedRole);
  }

  async getAll(): Promise<RoleEntity[]> {
    const allRoles = await this.prismaService.role.findMany();
    return toEntityArray<RoleEntity>(allRoles, RoleEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.role.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async deleteByIds(
    ids: EntityGetCommand.RequestParam[],
  ): Promise<Prisma.BatchPayload> {
    const deletedCount = await this.prismaService.role.deleteMany({
      where: {
        uuid: {
          in: ids,
        },
      },
    });
    return deletedCount;
  }

  async getById(id: string): Promise<RoleEntity> {
    const concreteRole = await this.prismaService.role.findUnique({
      where: {
        uuid: id,
      },
    });

    return new RoleEntity(concreteRole);
  }

  async getByValue(value: EUserTypeVariants): Promise<RoleEntity> {
    const concreteRole = await this.prismaService.role.findUnique({
      where: {
        name: value,
      },
    });

    return new RoleEntity(concreteRole);
  }
}
