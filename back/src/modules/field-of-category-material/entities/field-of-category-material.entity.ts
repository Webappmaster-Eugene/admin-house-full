import {
  CategoryMaterial,
  EActiveStatuses,
  FieldOfCategoryMaterial,
  FieldType,
  FieldUnitMeasurement,
  FieldVariantsForSelectorFieldType,
  Handbook,
} from '.prisma/client';
import { CategoryMaterialEntity } from 'src/modules/category-material/entities/category-material.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { FieldTypeEntity } from 'src/modules/field-type/entities/field-type.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';
import { FieldVariantsForSelectorFieldTypeEntity } from 'src/modules/field-variants-for-selector-field-type/entities/field-variants-for-selector-field-type.entity';
import { z } from 'zod';
import { CategoryMaterialBusinessValueSchema } from 'libs/contracts/src/models/category-material/category-material-business-value.schema';

export interface FieldOfCategoryMaterialRelatedEntities {
  categoriesMaterial: CategoryMaterial[];
  handbook: Handbook;
  fieldType: FieldType;
  unitOfMeasurement: FieldUnitMeasurement;
  fieldVariantsForSelectorFieldType: FieldVariantsForSelectorFieldType[];
  categoriesMaterialsTemplatesIncludesThisField: CategoryMaterial[];
}

export class FieldOfCategoryMaterialEntity implements FieldOfCategoryMaterial, FieldOfCategoryMaterialRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  numInOrder: number;
  fieldOfCategoryMaterialStatus: EActiveStatuses;
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
  categoriesMaterial: CategoryMaterial[];
  handbook: Handbook;
  fieldType: FieldType;
  unitOfMeasurement: FieldUnitMeasurement;
  fieldVariantsForSelectorFieldType: FieldVariantsForSelectorFieldType[];
  categoriesMaterialsTemplatesIncludesThisField: CategoryMaterial[];

  constructor(fieldOfCategoryMaterial: Partial<FieldOfCategoryMaterial>) {
    Object.assign(this, fieldOfCategoryMaterial);
    return this;
  }
}
