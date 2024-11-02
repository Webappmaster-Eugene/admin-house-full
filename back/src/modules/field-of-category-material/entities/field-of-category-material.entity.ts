import {
  CategoryMaterial,
  CharacteristicsMaterial,
  EActiveStatuses,
  FieldOfCategoryMaterial,
  FieldType,
  FieldUnitMeasurement,
  FieldVariantsForSelectorFieldType,
  Handbook,
} from '.prisma/client';

export interface FieldOfCategoryMaterialRelatedEntities {
  characteristicsMaterial: CharacteristicsMaterial[];
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
  characteristicsMaterial: CharacteristicsMaterial[];
  unitOfMeasurement: FieldUnitMeasurement;
  fieldVariantsForSelectorFieldType: FieldVariantsForSelectorFieldType[];
  categoriesMaterialsTemplatesIncludesThisField: CategoryMaterial[];

  constructor(fieldOfCategoryMaterial: Partial<FieldOfCategoryMaterial>) {
    Object.assign(this, fieldOfCategoryMaterial);
    return this;
  }
}
