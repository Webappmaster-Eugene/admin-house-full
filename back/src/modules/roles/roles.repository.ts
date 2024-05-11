import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EUserTypeVariants } from '@prisma/client';
import { RoleCreateRequestDto } from './dto/controller/create-role.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IRoleRepository } from './types/role.repository.interface';
import { RoleUpdateRequestDto } from './dto/controller/update-role.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { RoleEntity } from './entities/role.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KFI } from '../../common/utils/di';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { BackendErrorNames, BackendPErrorCodes, InternalError } from '../../common/errors/errors.backend';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { USER_TAKE_LIMIT } from '../../common/consts/take-quantity.limitation';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(roleId: EntityUrlParamCommand.RequestNumberParam): Promise<RoleEntity> {
    try {
      const concreteRole = await this.databaseService.role.findUnique({
        where: {
          idRole: roleId,
        },
      });
      if (concreteRole) {
        return new RoleEntity(concreteRole);
      } else {
        throw new NotFoundException({
          message: `Role with id=${roleId} not found`,
          description: 'Role from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getByUuid(roleUuid: EntityUrlParamCommand.RequestUuidParam): Promise<RoleEntity> {
    try {
      const concreteRole = await this.databaseService.role.findUnique({
        where: {
          uuid: roleUuid,
        },
      });
      if (concreteRole) {
        return new RoleEntity(concreteRole);
      } else {
        throw new NotFoundException({
          message: `Role with uuid=${roleUuid} not found`,
          description: 'Role from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getByValue(roleName: EUserTypeVariants): Promise<RoleEntity> {
    try {
      const concreteRole = await this.databaseService.role.findUnique({
        where: {
          name: roleName,
        },
      });
      if (concreteRole) {
        return new RoleEntity(concreteRole);
      } else {
        throw new NotFoundException({
          message: `Role with name=${roleName} not found`,
          description: 'Role from your request did not found in the database',
        });
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getAll(skip: number = 0, take: number = 4): Promise<RoleEntity[]> {
    try {
      const allRoles = await this.databaseService.role.findMany({ take, skip });
      return toEntityArray<RoleEntity>(allRoles, RoleEntity);
    } catch (error: unknown) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async getAllCount(): Promise<CountData> {
    try {
      const total = await this.databaseService.role.count({
        select: {
          _all: true, // Count all records
        },
      });
      return { total: total._all };
    } catch (error: unknown) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async create({ name, description }: RoleCreateRequestDto): Promise<RoleEntity> {
    try {
      const newRole = await this.databaseService.role.create({
        data: {
          name,
          description,
        },
      });
      return new RoleEntity(newRole);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_CONFLICT_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.CONFLICT_ERROR, error));
      }
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async updateById(roleUuid: EntityUrlParamCommand.RequestUuidParam, { description }: RoleUpdateRequestDto): Promise<RoleEntity> {
    try {
      const updatedRole = await this.databaseService.role.update({
        where: {
          uuid: roleUuid,
        },
        data: {
          description,
        },
      });
      return new RoleEntity(updatedRole);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }

  async deleteById(roleUuid: EntityUrlParamCommand.RequestUuidParam): Promise<RoleEntity> {
    try {
      const deletedRole = await this.databaseService.role.delete({
        where: {
          uuid: roleUuid,
        },
      });
      return new RoleEntity(deletedRole);
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
        throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
      }

      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
    }
  }
}
