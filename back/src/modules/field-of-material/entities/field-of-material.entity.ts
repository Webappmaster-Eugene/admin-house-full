import { FieldOfMaterial } from '@prisma/client';

export class FieldOfMaterialEntity implements FieldOfMaterial {
  uuid: string;
  name: string;
  comment: string;
  categoryMaterialUuid: string;
  fieldTypeUuid: string;
  isRequired: boolean;
  defaultValue: string | null;
  handbookUuid: string;
  createdByUuid: string;
  unitOfMeasurementUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldType: Partial<FieldOfMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
