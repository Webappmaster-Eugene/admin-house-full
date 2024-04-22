import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MaterialCreateRequestDto } from './dto/controller/create-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IMaterialRepository } from './types/material.repository.interface';
import { MaterialUpdateRequestDto } from './dto/controller/update-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { MaterialEntity } from './entities/material.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/material.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MaterialRepository implements IMaterialRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    materialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<MaterialEntity> {
    try {
      const findedMaterial = await this.databaseService.material.findUnique({
        where: {
          uuid: materialId,
        },
      });

      if (findedMaterial) {
        return new MaterialEntity(findedMaterial);
      } else {
        throw new NotFoundException({
          message: `Material with id=${materialId} not found`,
          description:
            'Material from your request did not found in the database',
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

  async getByManagerId(
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<MaterialEntity> {
    try {
      const findedMaterial = await this.databaseService.material.findUnique({
        where: {
          responsibleManagerUuid: managerId,
        },
      });

      if (findedMaterial) {
        return new MaterialEntity(findedMaterial);
      } else {
        throw new NotFoundException({
          message: `Material with managerId=${managerId} not found`,
          description:
            'Material from your request did not found in the database',
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

  async getAll(): Promise<MaterialEntity[]> {
    try {
      const allMaterials = await this.databaseService.material.findMany();
      return toEntityArray<MaterialEntity>(allMaterials, MaterialEntity);
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
      const total = await this.databaseService.material.count({
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
    dto: MaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<MaterialEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newMaterial = await this.databaseService.material.create({
        data: {
          name: name || DEFAULT_HANDBOOK_NAME + ` of user #${managerId}`,
          description:
            description ||
            DEFAULT_HANDBOOK_DESCRIPTION + ` of user #${managerId}`,
          canCustomerView: canCustomerView || false,
          responsibleManagerUuid: managerId,
          workspaceUuid,
        },
      });
      return new MaterialEntity(newMaterial);
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
    materialId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: MaterialUpdateRequestDto,
  ): Promise<MaterialEntity> {
    try {
      const updatedMaterial = await this.databaseService.material.update({
        where: {
          uuid: materialId,
        },
        data: {
          name,
          description,
        },
      });

      return new MaterialEntity(updatedMaterial);
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
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<MaterialEntity> {
    try {
      const deletedMaterial = await this.databaseService.material.delete({
        where: {
          uuid: id,
        },
      });

      return new MaterialEntity(deletedMaterial);
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
