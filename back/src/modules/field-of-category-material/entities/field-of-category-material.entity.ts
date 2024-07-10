import { FieldOfCategoryMaterial } from '.prisma/client';
import { CategoryMaterialEntity } from 'src/modules/category-material/entities/category-material.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { FieldTypeEntity } from 'src/modules/field-type/entities/field-type.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';
import { FieldVariantsForSelectorFieldTypeEntity } from 'src/modules/field-variants-for-selector-field-type/entities/field-variants-for-selector-field-type.entity';

export interface FieldOfCategoryRelatedEntities {
  categoryMaterial: CategoryMaterialEntity;
  handbook: HandbookEntity;
  fieldType: FieldTypeEntity;
  unitOfMeasurement: FieldUnitMeasurementEntity;
  fieldVariantsForSelectorFieldType: FieldVariantsForSelectorFieldTypeEntity[];
}

export class FieldOfCategoryMaterialEntity implements FieldOfCategoryMaterial, FieldOfCategoryRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  uniqueNameForTemplate: string;
  categoryMaterialUuid: string;
  fieldTypeUuid: string;
  isRequired: boolean;
  defaultValue: string | null;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  unitOfMeasurementUuid: string;
  createdAt: Date;
  updatedAt: Date;
  categoryMaterial: CategoryMaterialEntity;
  handbook: HandbookEntity;
  fieldType: FieldTypeEntity;
  unitOfMeasurement: FieldUnitMeasurementEntity;
  fieldVariantsForSelectorFieldType: FieldVariantsForSelectorFieldTypeEntity[];

  constructor(fieldType: Partial<FieldOfCategoryMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
