import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CountData } from '../../common/types/main/count.data';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { toEntityArray } from '../../common/utils/mappers';
import {
  DEFAULT_HANDBOOK_DESCRIPTION,
  DEFAULT_HANDBOOK_NAME,
} from './lib/consts/category-material.default-data';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { jsonStringify } from '../../common/helpers/stringify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryMaterialRepository implements ICategoryMaterialRepository {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialEntity> {
    try {
      const findedCategoryMaterial =
        await this.databaseService.categoryMaterial.findUnique({
          where: {
            uuid: categoryMaterialId,
          },
        });

      if (findedCategoryMaterial) {
        return new CategoryMaterialEntity(findedCategoryMaterial);
      } else {
        throw new NotFoundException({
          message: `CategoryMaterial with id=${categoryMaterialId} not found`,
          description:
            'CategoryMaterial from your request did not found in the database',
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

  async getAll(): Promise<CategoryMaterialEntity[]> {
    try {
      const allCategoryMaterials =
        await this.databaseService.categoryMaterial.findMany();
      return toEntityArray<CategoryMaterialEntity>(
        allCategoryMaterials,
        CategoryMaterialEntity,
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
      const total = await this.databaseService.categoryMaterial.count({
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
    dto: CategoryMaterialCreateRequestDto,
    managerId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialEntity> {
    try {
      const { name, description, canCustomerView, workspaceUuid } = dto;
      const newCategoryMaterial =
        await this.databaseService.categoryMaterial.create({
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
      return new CategoryMaterialEntity(newCategoryMaterial);
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
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: CategoryMaterialUpdateRequestDto,
  ): Promise<CategoryMaterialEntity> {
    try {
      const updatedCategoryMaterial =
        await this.databaseService.categoryMaterial.update({
          where: {
            uuid: categoryMaterialId,
          },
          data: {
            name,
            description,
          },
        });

      return new CategoryMaterialEntity(updatedCategoryMaterial);
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
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<CategoryMaterialEntity> {
    try {
      const deletedCategoryMaterial =
        await this.databaseService.categoryMaterial.delete({
          where: {
            uuid: categoryMaterialId,
          },
        });

      return new CategoryMaterialEntity(deletedCategoryMaterial);
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
