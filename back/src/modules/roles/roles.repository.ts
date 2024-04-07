import { Inject, Injectable } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { RoleCreateRequestDto } from './dto/controller/create-project.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/project.repository.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-project.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { RoleEntity } from './entities/project.entity';
import { toEntityArray } from '../../common/utils/mappers/toEntityArray';
import { PrismaService } from '../../prisma/prisma.service';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async create({
    name,
    description,
  }: RoleCreateRequestDto): Promise<RoleEntity> {
    const newRole = await this.prismaService.project.create({
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
    const updatedRole = await this.prismaService.project.update({
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
    const allRoles = await this.prismaService.project.findMany();
    return toEntityArray<RoleEntity>(allRoles, RoleEntity);
  }

  async getAllCount(): Promise<CountData> {
    const total = await this.prismaService.project.count({
      select: {
        _all: true, // Count all records
      },
    });
    return { total: total._all };
  }

  async deleteById(
    id: EntityUrlParamCommand.RequestParam,
  ): Promise<RoleEntity> {
    const deletedRole = await this.prismaService.project.delete({
      where: {
        uuid: id,
      },
    });
    return new RoleEntity(deletedRole);
  }

  async getById(
    id: EntityUrlParamCommand.RequestParamNumber,
  ): Promise<RoleEntity> {
    console.log(id);
    console.log(typeof id);
    const concreteRole = await this.prismaService.project.findUnique({
      where: {
        idRole: id,
      },
    });
    console.log(concreteRole);

    return new RoleEntity(concreteRole);
  }

  async getByValue(value: EUserTypeVariants): Promise<RoleEntity> {
    const concreteRole = await this.prismaService.project.findUnique({
      where: {
        name: value,
      },
    });

    return new RoleEntity(concreteRole);
  }
}
