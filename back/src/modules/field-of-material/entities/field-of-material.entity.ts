import { FieldOfMaterial } from '@prisma/client';

export class FieldOfMaterialEntity implements FieldOfMaterial {
  uuid: string;
  name: string;
  categoryUuid: string;
  fieldTypeUuid: string;
  comment: string | null;
  isRequired: boolean;
  defaultValue: string | null;
  createdByUuid: string;
  unitOfMeasurementUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldType: Partial<FieldOfMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
