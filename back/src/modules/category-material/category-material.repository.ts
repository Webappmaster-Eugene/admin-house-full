import { Inject, Injectable } from '@nestjs/common';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { EntityUrlParamCommand } from 'libs/contracts';

@Injectable()
export class CategoryMaterialRepository implements ICategoryMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const findedCategoryMaterial = await this.databaseService.categoryMaterial.findUnique({
        where: {
          uuid: categoryMaterialId,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(findedCategoryMaterial, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<CategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCategoryMaterials = await this.databaseService.categoryMaterial.findMany({
        take,
        skip,
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(allCategoryMaterials, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<CategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCategoryMaterials = await this.databaseService.categoryMaterial.findMany({
        where: { handbookUuid: handbookId },
        take,
        skip,
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(allCategoryMaterials, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(dto: CategoryMaterialCreateRequestDto, handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const { name, templateName, comment, globalCategoryMaterialUuid } = dto;
      const newCategoryMaterial = await this.databaseService.categoryMaterial.create({
        data: { name, templateName, comment, globalCategoryMaterialUuid, handbookUuid: handbookId },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(newCategoryMaterial, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    { name, templateName, comment }: CategoryMaterialUpdateRequestDto,
  ): Promise<CategoryMaterialEntity> {
    try {
      const updatedCategoryMaterial = await this.databaseService.categoryMaterial.update({
        where: {
          uuid: categoryMaterialId,
        },
        data: {
          name,
          templateName,
          comment,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(
        updatedCategoryMaterial,
        CategoryMaterialEntity,
        EntityName.CATEGORY_MATERIAL,
      ) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const deletedCategoryMaterial = await this.databaseService.categoryMaterial.delete({
        where: {
          uuid: categoryMaterialId,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(
        deletedCategoryMaterial,
        CategoryMaterialEntity,
        EntityName.CATEGORY_MATERIAL,
      ) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
