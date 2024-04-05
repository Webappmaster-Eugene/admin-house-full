import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EUserTypeVariants, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RoleEntity } from './entities/role.entity';
import { IRoleService } from './types/role.service.interface';
import { RoleCreateRequestDto } from './dto/create-role.dto';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ILogger } from '../../common/types/main/logger.interface';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';
import { RoleDbEntity } from './entities/role.db.entity';
import { RoleUpdateRequestDto } from './dto/update-role.dto';
import { EntityGetCommand } from '../../../libs/contracts/commands/common/get-param.command';
import { UniversalServiceResponse } from '../../common/types/responses/universal-service-response.interface';
import { CountData } from '../../common/types/main/count.data';
import { USER_TYPE_VARIANTS } from '../../common/consts/consts';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    private readonly prismaService: IPrismaService,
    private readonly logger: ILogger,
  ) {}

  async create({
    name,
    description,
  }: RoleCreateRequestDto): Promise<RoleDbEntity> {
    const newRole: RoleDbEntity = await this.prismaService.role.create({
      data: {
        name,
        description,
      },
    });

    return newRole;
  }

  async updateById(
    id: string,
    { description }: RoleUpdateRequestDto,
  ): Promise<RoleDbEntity> {
    const updatedRole: RoleDbEntity = await this.prismaService.role.update({
      where: {
        uuid: id,
      },
      data: {
        description,
      },
    });

    return updatedRole;
  }

  async getAll(): Promise<RoleDbEntity[]> {
    const allRoles: RoleDbEntity[] = await this.prismaService.role.findMany();
    return allRoles;
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
    const allRoles = await this.prismaService.role.deleteMany({
      where: {
        uuid: {
          in: ids,
        },
      },
    });
    return allRoles;
  }

  async getById(id: string): Promise<RoleDbEntity> {
    const concreteRole = await this.prismaService.role.findUnique({
      where: {
        uuid: id,
      },
    });

    return concreteRole;
  }

  async getByValue(value: EUserTypeVariants): Promise<RoleDbEntity> {
    const concreteRole = await this.prismaService.role.findUnique({
      where: {
        name: value,
      },
    });

    return concreteRole;
  }
}
