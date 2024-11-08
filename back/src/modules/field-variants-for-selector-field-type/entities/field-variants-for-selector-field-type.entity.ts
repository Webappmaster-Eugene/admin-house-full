import { EActiveStatuses, FieldOfCategoryMaterial, FieldVariantsForSelectorFieldType, Handbook } from '.prisma/client';

export interface FieldVariantsForSelectorFieldTypeRelatedEntities {
  handbook: Handbook;
  fieldOfCategoryMaterial: FieldOfCategoryMaterial;
}

export class FieldVariantsForSelectorFieldTypeEntity
  implements FieldVariantsForSelectorFieldType, FieldVariantsForSelectorFieldTypeRelatedEntities
{
  uuid: string;
  value: string;
  numInOrder: number;
  fieldVariantsForSelectorFieldTypeStatus: EActiveStatuses;
  fieldOfCategoryMaterialUuid: string;
  description: string;
  fieldTypeUuid: string;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: Handbook;
  fieldOfCategoryMaterial: FieldOfCategoryMaterial;

  constructor(fieldVariantsForSelectorFieldType: Partial<FieldVariantsForSelectorFieldType>) {
    Object.assign(this, fieldVariantsForSelectorFieldType);
    return this;
  }
}
