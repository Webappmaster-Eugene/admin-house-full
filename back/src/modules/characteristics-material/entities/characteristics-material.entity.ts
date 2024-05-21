import { CharacteristicsMaterial } from '.prisma/client';

export class CharacteristicsMaterialEntity implements CharacteristicsMaterial {
  uuid: string;
  name: string;
  value: string;
  comment: string;
  fieldTypeUuid: string;
  fieldOfCategoryMaterialUuid: string;
  categoryMaterialUuid: string;
  materialUuid: string;
  handbookUuid: string;
  addedByUserUuid: string;
  fieldUnitMeasurementUuid: string | null;

  createdAt: Date;
  updatedAt: Date;

  constructor(fieldType: Partial<CharacteristicsMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
