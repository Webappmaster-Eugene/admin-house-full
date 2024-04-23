import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GlobalCategoryMaterialCreateRequestDto } from './dto/controller/create-global-category-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IGlobalCategoryMaterialRepository } from './types/global-category-material.repository.interface';
import { GlobalCategoryMaterialUpdateRequestDto } from './dto/controller/update-global-category-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { GlobalCategoryMaterialEntity } from './entities/global-category-material.entity';
import { toEntityArray } from '../../common/utils/mappers';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GlobalCategoryMaterialRepository
  implements IGlobalCategoryMaterialRepository
{
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryMaterialEntity> {
    try {
      const findedGlobalCategory =
        await this.databaseService.globalCategoryMaterial.findUnique({
          where: {
            uuid: globalCategoryMaterialId,
          },
        });

      if (findedGlobalCategory) {
        return new GlobalCategoryMaterialEntity(findedGlobalCategory);
      } else {
        throw new NotFoundException({
          message: `GlobalCategoryMaterial not found`,
          description:
            'GlobalCategory from your request did not found in the database',
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

  async getAll(): Promise<GlobalCategoryMaterialEntity[]> {
    try {
      const allGlobalCategories =
        await this.databaseService.globalCategoryMaterial.findMany();
      return toEntityArray<GlobalCategoryMaterialEntity>(
        allGlobalCategories,
        GlobalCategoryMaterialEntity,
      );
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
      const total = await this.databaseService.globalCategoryMaterial.count({
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
    dto: GlobalCategoryMaterialCreateRequestDto,
  ): Promise<GlobalCategoryMaterialEntity> {
    try {
      const { name, comment, color, nameRu } = dto;
      const newGlobalCategoryMaterial =
        await this.databaseService.globalCategoryMaterial.create({
          data: {
            name,
            comment,
            color,
            nameRu,
          },
        });
      return new GlobalCategoryMaterialEntity(newGlobalCategoryMaterial);
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
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryMaterialUpdateRequestDto,
  ): Promise<GlobalCategoryMaterialEntity> {
    try {
      const { name, comment, color, nameRu } = dto;

      const updatedGlobalCategoryMaterial =
        await this.databaseService.globalCategoryMaterial.update({
          where: {
            uuid: globalCategoryMaterialId,
          },
          data: {
            name,
            comment,
            color,
            nameRu,
          },
        });
      return new GlobalCategoryMaterialEntity(updatedGlobalCategoryMaterial);
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
    globalCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryMaterialEntity> {
    try {
      const deletedGlobalCategory =
        await this.databaseService.globalCategoryMaterial.delete({
          where: {
            uuid: globalCategoryMaterialId,
          },
        });
      return new GlobalCategoryMaterialEntity(deletedGlobalCategory);
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
