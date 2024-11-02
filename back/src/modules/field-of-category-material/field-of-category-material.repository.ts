import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldOfCategoryMaterialRepository } from './types/field-of-category-material.repository.interface';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialEntity } from './entities/field-of-category-material.entity';
import { FieldOfCategoryMaterialCreateRequestDto } from './dto/controller/create-field-of-category-material.dto';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { fieldOfCategoryMaterialTemplateGenerator } from '../../common/helpers/regex/fieldOfCategoryMaterialTemplateGenerator';

@Injectable()
export class FieldOfCategoryMaterialRepository implements IFieldOfCategoryMaterialRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfCategoryMaterialEntity> {
    try {
      const findedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.findUnique({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      return existenceEntityHandler(
        findedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_MAX_LIMIT): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({
        take,
        skip,
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });
      return existenceEntityHandler(
        allFieldOfCategoryMaterials,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInHandbook(
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({
        where: { handbookUuid: handbookId },
        take,
        skip,
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      return existenceEntityHandler(
        allFieldOfCategoryMaterials,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAllInCategoryMaterial(
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    skip = 0,
    take = QUANTITY_LIMIT.TAKE_MAX_LIMIT,
  ): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({
        where: {
          categoriesMaterial: {
            some: {
              uuid: categoryMaterialId,
            },
          },
        },
        take,
        skip,
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });
      return existenceEntityHandler(
        allFieldOfCategoryMaterials,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: FieldOfCategoryMaterialCreateRequestDto,
    handbookId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldOfCategoryMaterialEntity> {
    try {
      const {
        name,
        fieldOfCategoryMaterialStatus,
        categoriesMaterial,
        comment,
        defaultValue,
        fieldTypeUuid,
        isRequired,
        unitOfMeasurementUuid,
      } = dto;
      const lastFieldOfCategoryMaterialInHandbook = await this.databaseService.material.findFirst({
        where: {
          handbookUuid: handbookId,
        },
      });
      const numInOrder = lastFieldOfCategoryMaterialInHandbook?.numInOrder + 1 || 1;

      const newFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.create({
        data: {
          name,
          comment,
          defaultValue,
          numInOrder,
          fieldOfCategoryMaterialStatus,
          fieldTypeUuid,
          isRequired,
          categoriesMaterial: {
            connect: categoriesMaterial?.map(categoryMaterial => ({
              uuid: categoryMaterial.uuid,
            })),
          },
          unitOfMeasurementUuid,
          handbookUuid: handbookId,
        },
      });
      const uniqueNameForTemplate = fieldOfCategoryMaterialTemplateGenerator(newFieldOfCategoryMaterial);
      const updatedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: newFieldOfCategoryMaterial.uuid,
        },
        data: {
          uniqueNameForTemplate,
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });
      return existenceEntityHandler(
        updatedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    dto: FieldOfCategoryMaterialCreateRequestDto,
  ): Promise<FieldOfCategoryMaterialEntity> {
    const oldCategoriesOfFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.findUnique({
      where: {
        uuid: fieldOfCategoryMaterialId,
      },
      include: {
        categoriesMaterial: true,
        categoriesMaterialsTemplatesIncludesThisField: true,
      },
    });

    try {
      const {
        name,
        comment,
        defaultValue,
        fieldOfCategoryMaterialStatus,
        fieldTypeUuid,
        categoriesMaterial,
        isRequired,
        unitOfMeasurementUuid,
      } = dto;
      let updatedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        data: {
          name,
          comment,
          defaultValue,
          unitOfMeasurementUuid,
          fieldOfCategoryMaterialStatus,
          fieldTypeUuid,
          categoriesMaterial: {
            disconnect: oldCategoriesOfFieldOfCategoryMaterial.categoriesMaterial?.map(categoryMaterial => ({
              uuid: categoryMaterial.uuid,
            })),
            connect: categoriesMaterial?.map(categoryMaterial => ({
              uuid: categoryMaterial.uuid,
            })),
          },
          isRequired,
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      if (fieldTypeUuid || name) {
        const updatedEntity = new FieldOfCategoryMaterialEntity(updatedFieldOfCategoryMaterial);
        const uniqueNameForTemplate = fieldOfCategoryMaterialTemplateGenerator(updatedFieldOfCategoryMaterial);
        updatedFieldOfCategoryMaterial = await this.rebuildFieldOfCategoryTemplateNameById(uniqueNameForTemplate, updatedEntity);
      }

      return existenceEntityHandler(
        updatedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async rebuildFieldOfCategoryTemplateNameById(
    uniqueNameForTemplate: string,
    updatedEntity: FieldOfCategoryMaterialEntity,
  ): Promise<FieldOfCategoryMaterialEntity> {
    try {
      const updatedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: updatedEntity.uuid,
        },
        data: {
          uniqueNameForTemplate,
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      return existenceEntityHandler(
        updatedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteOldFieldVariantsOfFieldOfCategoryById(
    fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldOfCategoryMaterialEntity> {
    const oldInfoFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.findUnique({
      where: {
        uuid: fieldOfCategoryMaterialId,
      },
      include: {
        fieldVariantsForSelectorFieldType: true,
      },
    });

    try {
      const updatedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        data: {
          fieldVariantsForSelectorFieldType: {
            deleteMany: oldInfoFieldOfCategoryMaterial.fieldVariantsForSelectorFieldType?.map(fieldVariantForSelectorFieldType => ({
              uuid: fieldVariantForSelectorFieldType.uuid,
            })),
          },
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      return existenceEntityHandler(
        updatedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(fieldOfCategoryMaterialId: EntityUrlParamCommand.RequestUuidParam): Promise<FieldOfCategoryMaterialEntity> {
    try {
      const disconnectedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        data: {
          categoriesMaterial: {
            disconnect: { uuid: fieldOfCategoryMaterialId },
          },
          categoriesMaterialsTemplatesIncludesThisField: {
            disconnect: { uuid: fieldOfCategoryMaterialId },
          },
        },
      });

      const deletedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.delete({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        include: {
          characteristicsMaterial: true,
          categoriesMaterial: true,
          handbook: true,
          fieldType: true,
          unitOfMeasurement: true,
          fieldVariantsForSelectorFieldType: true,
          categoriesMaterialsTemplatesIncludesThisField: true,
        },
      });

      return existenceEntityHandler(
        deletedFieldOfCategoryMaterial,
        FieldOfCategoryMaterialEntity,
        EntityName.FIELD_OF_CATEGORY_MATERIAL,
      ) as FieldOfCategoryMaterialEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
