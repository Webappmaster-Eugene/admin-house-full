import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { RoleEntity } from './entities/role.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async getById(
    id: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<RoleEntity> {
    const concreteRole = await this.prismaService.role.findUnique({
      where: {
        idRole: id,
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
    id: EntityUrlParamCommand.RequestUuidParam,
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

  async deleteById(
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<RoleEntity> {
    const deletedRole = await this.prismaService.role.delete({
      where: {
        uuid: id,
      },
    });
    return new RoleEntity(deletedRole);
  }
}
