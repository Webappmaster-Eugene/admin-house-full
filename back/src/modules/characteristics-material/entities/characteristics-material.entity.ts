import { CharacteristicsMaterial, EActiveStatuses, FieldOfCategoryMaterial, Handbook, Material } from '.prisma/client';

export interface CharacteristicsMaterialRelatedEntities {
  material: Material;
  fieldOfCategoryMaterial: FieldOfCategoryMaterial;
  handbook: Handbook;
}

export class CharacteristicsMaterialEntity implements CharacteristicsMaterial, CharacteristicsMaterialRelatedEntities {
  uuid: string;
  value: string;
  numInOrder: number;
  characteristicsMaterialStatus: EActiveStatuses;
  comment: string;
  fieldOfCategoryMaterialUuid: string;
  materialUuid: string;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  material: Material;
  fieldOfCategoryMaterial: FieldOfCategoryMaterial;
  handbook: Handbook;

  constructor(fieldType: Partial<CharacteristicsMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
