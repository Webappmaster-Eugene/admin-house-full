import { FieldOfCategoryMaterial, FieldVariantsForSelectorFieldType, Handbook } from '.prisma/client';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';

export interface FieldVariantsForSelectorFieldTypeRelatedEntities {
  handbook: HandbookEntity;
  fieldOfCategoryMaterial: FieldOfCategoryMaterialEntity;
}

export class FieldVariantsForSelectorFieldTypeEntity
  implements FieldVariantsForSelectorFieldType, FieldVariantsForSelectorFieldTypeRelatedEntities
{
  uuid: string;
  value: string;
  fieldOfCategoryMaterialUuid: string;
  description: string;
  fieldTypeUuid: string;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  handbook: HandbookEntity;
  fieldOfCategoryMaterial: FieldOfCategoryMaterialEntity;

  constructor(fieldVariantsForSelectorFieldType: Partial<FieldVariantsForSelectorFieldType>) {
    Object.assign(this, fieldVariantsForSelectorFieldType);
    return this;
  }
}
