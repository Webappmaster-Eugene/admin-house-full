import { Inject, Injectable } from '@nestjs/common';
import { CategoryMaterialCreateRequestDto } from './dto/controller/create-category-material.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { ICategoryMaterialRepository } from './types/category-material.repository.interface';
import { CategoryMaterialUpdateRequestDto } from './dto/controller/update-category-material.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { CategoryMaterialEntity } from './entities/category-material.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

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
      });

      return existenceEntityHandler(findedCategoryMaterial, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<CategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCategoryMaterials = await this.databaseService.categoryMaterial.findMany({ take, skip });
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
