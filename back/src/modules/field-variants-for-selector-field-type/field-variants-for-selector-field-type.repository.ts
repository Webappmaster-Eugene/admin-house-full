import { Inject, Injectable } from '@nestjs/common';
import { FieldVariantsForSelectorFieldTypeCreateRequestDto } from './dto/controller/create-field-variants-for-selector-field-type.dto';
import { IPrismaService } from '../../common/types/main/prisma.interface';
import { IFieldVariantsForSelectorFieldTypeRepository } from './types/field-variants-for-selector-field-type.repository.interface';
import { FieldVariantsForSelectorFieldTypeUpdateRequestDto } from './dto/controller/update-field-variants-for-selector-field-type.dto';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { FieldVariantsForSelectorFieldTypeEntity } from './entities/field-variants-for-selector-field-type.entity';
import { KFI } from '../../common/utils/di';
import { existenceEntityHandler } from '../../common/helpers/handlers/existance-entity-handler';
import { EntityName } from '../../common/types/entity.enum';
import { errorRepositoryHandler } from '../../common/helpers/handlers/error-repository.handler';
import { limitTakeHandler } from '../../common/helpers/handlers/take-limit.handler';
import { QUANTITY_LIMIT } from '../../common/consts/take-quantity.limitation';

@Injectable()
export class FieldVariantsForSelectorFieldTypeRepository implements IFieldVariantsForSelectorFieldTypeRepository {
  constructor(
    @Inject(KFI.PRISMA_SERVICE)
    private readonly databaseService: IPrismaService,
  ) {}

  async getById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const findedFieldVariantsForSelectorFieldType = await this.databaseService.fieldVariantsForSelectorFieldType.findUnique({
        where: {
          uuid: fieldVariantsForSelectorFieldTypeId,
        },
      });

      return existenceEntityHandler(
        findedFieldVariantsForSelectorFieldType,
        FieldVariantsForSelectorFieldTypeEntity,
        EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
      ) as FieldVariantsForSelectorFieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async getAll(skip = 0, take = QUANTITY_LIMIT.TAKE_5): Promise<FieldVariantsForSelectorFieldTypeEntity[]> {
    limitTakeHandler(take);

    try {
      const allFieldVariantsForSelectorFieldTypes = await this.databaseService.fieldVariantsForSelectorFieldType.findMany({ skip, take });
      return existenceEntityHandler(
        allFieldVariantsForSelectorFieldTypes,
        FieldVariantsForSelectorFieldTypeEntity,
        EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
      ) as FieldVariantsForSelectorFieldTypeEntity[];
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async create(
    dto: FieldVariantsForSelectorFieldTypeCreateRequestDto,
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      // FIXME делать проверку если fieldTypeUuid не спиок/селектор, то отмена
      const { name, fieldTypeUuid, description } = dto;
      const newFieldVariantsForSelectorFieldType = await this.databaseService.fieldVariantsForSelectorFieldType.create({
        data: { name, fieldTypeUuid, handbookUuid, description },
      });
      return existenceEntityHandler(
        newFieldVariantsForSelectorFieldType,
        FieldVariantsForSelectorFieldTypeEntity,
        EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
      ) as FieldVariantsForSelectorFieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async updateById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
    { name, description }: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const updatedFieldVariantsForSelectorFieldType = await this.databaseService.fieldVariantsForSelectorFieldType.update({
        where: {
          uuid: fieldVariantsForSelectorFieldTypeId,
        },
        data: { name, description },
      });

      return existenceEntityHandler(
        updatedFieldVariantsForSelectorFieldType,
        FieldVariantsForSelectorFieldTypeEntity,
        EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
      ) as FieldVariantsForSelectorFieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }

  async deleteById(
    fieldVariantsForSelectorFieldTypeId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<FieldVariantsForSelectorFieldTypeEntity> {
    try {
      const deletedFieldVariantsForSelectorFieldType = await this.databaseService.fieldVariantsForSelectorFieldType.delete({
        where: {
          uuid: fieldVariantsForSelectorFieldTypeId,
        },
      });

      return existenceEntityHandler(
        deletedFieldVariantsForSelectorFieldType,
        FieldVariantsForSelectorFieldTypeEntity,
        EntityName.FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE,
      ) as FieldVariantsForSelectorFieldTypeEntity;
    } catch (error: unknown) {
      errorRepositoryHandler(error);
    }
  }
}
