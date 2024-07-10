import { CharacteristicsMaterial } from '.prisma/client';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { FieldTypeEntity } from 'src/modules/field-type/entities/field-type.entity';
import { FieldUnitMeasurementEntity } from 'src/modules/field-unit-measurement/entities/field-unit-measurement.entity';

export interface CharacteristicsMaterialRelatedEntities {
  material: MaterialEntity;
  fieldOfCategoryMaterial: FieldOfCategoryMaterialEntity;
  handbook: HandbookEntity;
  fieldType: FieldTypeEntity;
  fieldUnitMeasurement: FieldUnitMeasurementEntity;
}

export class CharacteristicsMaterialEntity implements CharacteristicsMaterial, CharacteristicsMaterialRelatedEntities {
  uuid: string;
  name: string;
  value: string;
  comment: string;
  fieldTypeUuid: string;
  fieldOfCategoryMaterialUuid: string;
  categoryMaterialUuid: string;
  materialUuid: string;
  handbookUuid: string;
  lastChangeByUserUuid: string;
  fieldUnitMeasurementUuid: string | null;
  createdAt: Date;
  updatedAt: Date;
  material: MaterialEntity;
  fieldOfCategoryMaterial: FieldOfCategoryMaterialEntity;
  handbook: HandbookEntity;
  fieldType: FieldTypeEntity;
  fieldUnitMeasurement: FieldUnitMeasurementEntity;

  constructor(fieldType: Partial<CharacteristicsMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
