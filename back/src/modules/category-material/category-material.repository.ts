import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { fieldCategoryMaterialExtractor } from '../../common/helpers/regex/fieldCategoryMaterialExtractor';
import { fieldOfCategoryMaterialTemplateGenerator } from '../../common/helpers/regex/fieldOfCategoryMaterialTemplateGenerator';
import { RegexTemplateNameTester } from '../../common/helpers/regex/regexTemplateNameTester';
import { Prisma } from '.prisma/client';

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
          fieldsOfCategoryMaterialsInTemplate: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });

      return existenceEntityHandler(findedCategoryMaterial, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getDefaultCategory(handbookId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const findedCategoryMaterial = await this.databaseService.categoryMaterial.findFirst({
        where: {
          isDefault: true,
          handbookUuid: handbookId,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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
          fieldsOfCategoryMaterialsInTemplate: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(allCategoryMaterials, CategoryMaterialEntity, EntityName.CATEGORY_MATERIAL) as CategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllWithIds(
    categoryIds: EntityUrlParamCommand.RequestUuidParam[],
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<CategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allCategoryMaterialsWithIds = await this.databaseService.categoryMaterial.findMany({
        where: {
          uuid: {
            in: categoryIds,
          },
        },
        take,
        skip,
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
          globalCategoryMaterial: true,
          handbook: true,
        },
      });
      return existenceEntityHandler(
        allCategoryMaterialsWithIds,
        CategoryMaterialEntity,
        EntityName.CATEGORY_MATERIAL,
      ) as CategoryMaterialEntity[];
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
          fieldsOfCategoryMaterialsInTemplate: true,
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
      const {
        name,
        fieldsOfCategoryMaterials,
        categoryMaterialStatus,
        fieldsOfCategoryMaterialsInTemplate,
        templateName,
        comment,
        globalCategoryMaterialUuid,
      } = dto;
      let newTemplateName: string;
      const lastCategoryMaterialInHandbook = await this.databaseService.material.findFirst({
        where: {
          handbookUuid: handbookId,
        },
      });
      const numInOrder = lastCategoryMaterialInHandbook?.numInOrder + 1 || 1;
      if (templateName) {
        if (RegexTemplateNameTester.test(templateName)) {
          newTemplateName = templateName;
        } else {
          throw new NotFoundException({
            message: `This category material "templateName" is bad (RegexTemplateNameTester)`,
            description: 'This category material "templateName" in request is bad due to (RegexTemplateNameTester)',
          });
        }
      }

      const newCategoryMaterial = await this.databaseService.categoryMaterial.create({
        data: {
          name,
          fieldsOfCategoryMaterials: {
            connect: fieldsOfCategoryMaterials?.map(fieldOfCategoryMaterial => ({
              uuid: fieldOfCategoryMaterial.uuid,
            })),
          },
          fieldsOfCategoryMaterialsInTemplate: {
            connect: fieldsOfCategoryMaterialsInTemplate?.map(fieldOfCategoryMaterialsInTemplate => ({
              uuid: fieldOfCategoryMaterialsInTemplate.uuid,
            })),
          },
          numInOrder,
          comment,
          globalCategoryMaterialUuid,
          categoryMaterialStatus,
          handbookUuid: handbookId,
          templateName: newTemplateName ?? newTemplateName,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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
    {
      name,
      templateName,
      comment,
      categoryMaterialStatus,
      fieldsOfCategoryMaterialsInTemplate,
      fieldsOfCategoryMaterials,
    }: CategoryMaterialUpdateRequestDto,
  ): Promise<CategoryMaterialEntity> {
    let newTemplateName: string;
    try {
      if (templateName) {
        if (RegexTemplateNameTester.test(templateName)) {
          newTemplateName = templateName;
        } else {
          throw new NotFoundException({
            message: `Strict admin key not found`,
            description: 'Strict admin key from your request did not found in the database',
          });
        }
      }

      const oldCategoryMaterialInfo = await this.databaseService.categoryMaterial.findFirst({
        where: {
          uuid: categoryMaterialId,
        },
        include: {
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
        },
      });

      const updatedCategoryMaterial = await this.databaseService.categoryMaterial.update({
        where: {
          uuid: categoryMaterialId,
        },
        data: {
          name,
          templateName: newTemplateName ?? newTemplateName,
          comment,
          categoryMaterialStatus,
          fieldsOfCategoryMaterials: {
            disconnect: oldCategoryMaterialInfo.fieldsOfCategoryMaterials?.map(fieldOfCategoryMaterial => ({
              uuid: fieldOfCategoryMaterial.uuid,
            })),
            connect: fieldsOfCategoryMaterials?.map(fieldOfCategoryMaterial => ({
              uuid: fieldOfCategoryMaterial.uuid,
            })),
          },
          fieldsOfCategoryMaterialsInTemplate: {
            disconnect: oldCategoryMaterialInfo.fieldsOfCategoryMaterialsInTemplate?.map(categoryMaterial => ({
              uuid: categoryMaterial.uuid,
            })),
            connect: fieldsOfCategoryMaterialsInTemplate?.map(fieldOfCategoryMaterialsInTemplate => ({
              uuid: fieldOfCategoryMaterialsInTemplate.uuid,
            })),
          },
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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

  async rebuildCategoryMaterialNameById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const oldCategoryMaterialInfo = await this.databaseService.categoryMaterial.findFirst({
        where: {
          uuid: categoryMaterialId,
        },
        include: {
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
        },
      });
      let newTemplateName = oldCategoryMaterialInfo.templateName;
      oldCategoryMaterialInfo.fieldsOfCategoryMaterialsInTemplate.map(fieldOfCategoryMaterialsInTemplate => {
        const replaceRegExp = fieldCategoryMaterialExtractor(fieldOfCategoryMaterialsInTemplate.uuid);
        const fieldOfCategoryMaterialTemplateName = fieldOfCategoryMaterialTemplateGenerator(fieldOfCategoryMaterialsInTemplate);
        newTemplateName = newTemplateName.replace(replaceRegExp, fieldOfCategoryMaterialTemplateName);
      });

      const updatedCategoryMaterial = await this.databaseService.categoryMaterial.update({
        where: {
          uuid: categoryMaterialId,
        },
        data: {
          templateName: newTemplateName,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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

  async disconnectMaterials(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    materialsToDisconnectIds: EntityUrlParamCommand.RequestUuidParam[],
  ): Promise<CategoryMaterialEntity> {
    try {
      const updatedCategoryMaterial = await this.databaseService.categoryMaterial.update({
        where: {
          uuid: categoryMaterialId,
          isDefault: false,
        },
        data: {
          materials: {
            disconnect: materialsToDisconnectIds?.map(materialToDisconnectId => ({
              uuid: materialToDisconnectId,
            })),
          },
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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
      console.log('deleteById2' + error);
      errorRepositoryHandler(error);
    }
  }

  async deleteById(categoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<CategoryMaterialEntity> {
    try {
      const deletedCategoryMaterial = await this.databaseService.categoryMaterial.delete({
        where: {
          uuid: categoryMaterialId,
          isDefault: false,
        },
        include: {
          materials: true,
          fieldsOfCategoryMaterials: true,
          fieldsOfCategoryMaterialsInTemplate: true,
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
      console.log('deleteById1' + error);
      errorRepositoryHandler(error);
    }
  }

  async deleteManyByIds(categoryMaterialIds: EntityUrlParamCommand.RequestUuidParam[]): Promise<Prisma.BatchPayload> {
    try {
      const deletedCategoryMaterials: Prisma.BatchPayload = await this.databaseService.categoryMaterial.deleteMany({
        where: {
          uuid: {
            in: categoryMaterialIds,
          },
          isDefault: false,
        },
      });
      return deletedCategoryMaterials;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
