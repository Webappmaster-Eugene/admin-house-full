import {
  CharacteristicsMaterial,
  EActiveStatuses,
  FieldOfCategoryMaterial,
  FieldType,
  FieldUnitMeasurement,
  Handbook,
  Material,
} from '.prisma/client';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { FieldTypeEntity } from 'src/modules/field-type/entities/field-type.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';

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
