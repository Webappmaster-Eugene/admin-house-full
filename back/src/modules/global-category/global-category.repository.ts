import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GlobalCategoryCreateRequestDto } from './dto/controller/create-global-category.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IGlobalCategoryRepository } from './types/global-category.repository.interface';
import { GlobalCategoryUpdateRequestDto } from './dto/controller/update-global-category.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { GlobalCategoryEntity } from './entities/global-category.entity';
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
export class GlobalCategoryRepository implements IGlobalCategoryRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryEntity> {
    try {
      const findedGlobalCategory =
        await this.databaseService.globalCategory.findUnique({
          where: {
            uuid: globalCategoryId,
          },
        });

      if (findedGlobalCategory) {
        return new GlobalCategoryEntity(findedGlobalCategory);
      } else {
        throw new NotFoundException({
          message: `GlobalCategory not found`,
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

  async getAll(): Promise<GlobalCategoryEntity[]> {
    try {
      const allGlobalCategories =
        await this.databaseService.globalCategory.findMany();
      return toEntityArray<GlobalCategoryEntity>(
        allGlobalCategories,
        GlobalCategoryEntity,
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
      const total = await this.databaseService.globalCategory.count({
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
    dto: GlobalCategoryCreateRequestDto,
  ): Promise<GlobalCategoryEntity> {
    try {
      const { name, comment, color, nameRu } = dto;
      const newGlobalCategory =
        await this.databaseService.globalCategory.create({
          data: {
            name,
            comment,
            color,
            nameRu,
          },
        });
      return new GlobalCategoryEntity(newGlobalCategory);
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
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
    dto: GlobalCategoryUpdateRequestDto,
  ): Promise<GlobalCategoryEntity> {
    try {
      const { name, comment, color, nameRu } = dto;

      const updatedGlobalCategory =
        await this.databaseService.globalCategory.update({
          where: {
            uuid: globalCategoryId,
          },
          data: {
            name,
            comment,
            color,
            nameRu,
          },
        });
      return new GlobalCategoryEntity(updatedGlobalCategory);
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
    globalCategoryId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<GlobalCategoryEntity> {
    try {
      const deletedGlobalCategory =
        await this.databaseService.globalCategory.delete({
          where: {
            uuid: globalCategoryId,
          },
        });
      return new GlobalCategoryEntity(deletedGlobalCategory);
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
