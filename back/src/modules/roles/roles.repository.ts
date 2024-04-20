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
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    roleId: EntityUrlParamCommand.RequestNumberParam,
  ): Promise<RoleEntity> {
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

  async getByUuid(
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<RoleEntity> {
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

  async getAll(): Promise<RoleEntity[]> {
    try {
      const allRoles = await this.databaseService.role.findMany();
      return toEntityArray<RoleEntity>(allRoles, RoleEntity);
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
      const total = await this.databaseService.role.count({
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

  async create({
    name,
    description,
  }: RoleCreateRequestDto): Promise<RoleEntity> {
    try {
      const newRole = await this.databaseService.role.create({
        data: {
          name,
          description,
        },
      });
      return new RoleEntity(newRole);
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
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
    { description }: RoleUpdateRequestDto,
  ): Promise<RoleEntity> {
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
    roleUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<RoleEntity> {
    try {
      const deletedRole = await this.databaseService.role.delete({
        where: {
          uuid: roleUuid,
        },
      });
      return new RoleEntity(deletedRole);
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
