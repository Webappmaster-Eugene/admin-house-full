import { Inject, Injectable } from '@nestjs/common';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldOfCategoryMaterialRepository } from './types/field-of-category-material.repository.interface';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { FieldOfCategoryMaterialEntity } from './entities/field-of-category-material.entity';
import { FieldOfCategoryMaterialCreateRequestDto } from './dto/controller/create-field-of-category-material.dto';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';

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

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({ take, skip });
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
    take = QUANTITY_LIMIT.TAKE_5,
  ): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({
        where: { handbookUuid: handbookId },
        take,
        skip,
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
    take = QUANTITY_LIMIT.TAKE_5,
  ): Promise<FieldOfCategoryMaterialEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldOfCategoryMaterials = await this.databaseService.fieldOfCategoryMaterial.findMany({
        where: { categoryMaterialUuid: categoryMaterialId },
        take,
        skip,
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
    categoryMaterialId: EntityUrlParamCommand.RequestUuidParam,
    userId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldOfCategoryMaterialEntity> {
    try {
      const { name, comment, defaultValue, uniqueNameForTemplate, fieldTypeUuid, isRequired, unitOfMeasurementUuid } = dto;
      const newFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.create({
        data: {
          name,
          comment,
          defaultValue,
          fieldTypeUuid,
          isRequired,
          categoryMaterialUuid: categoryMaterialId,
          unitOfMeasurementUuid,
          uniqueNameForTemplate,
          handbookUuid: handbookId,
          createdByUuid: userId,
        },
      });
      return existenceEntityHandler(
        newFieldOfCategoryMaterial,
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
    try {
      const { name, comment, defaultValue, fieldTypeUuid, isRequired, categoryMaterialUuid, unitOfMeasurementUuid } = dto;
      const updatedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.update({
        where: {
          uuid: fieldOfCategoryMaterialId,
        },
        data: {
          name,
          comment,
          defaultValue,
          fieldTypeUuid,
          isRequired,
          categoryMaterialUuid,
          unitOfMeasurementUuid,
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
      const deletedFieldOfCategoryMaterial = await this.databaseService.fieldOfCategoryMaterial.delete({
        where: {
          uuid: fieldOfCategoryMaterialId,
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
