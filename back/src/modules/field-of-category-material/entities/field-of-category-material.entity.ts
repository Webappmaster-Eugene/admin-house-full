import { FieldOfCategoryMaterial } from '.prisma/client';

export class FieldOfCategoryMaterialEntity implements FieldOfCategoryMaterial {
  uuid: string;
  name: string;
  comment: string;
  uniqueNameForTemplate: string;
  categoryMaterialUuid: string;
  fieldTypeUuid: string;
  isRequired: boolean;
  defaultValue: string | null;
  handbookUuid: string;
  createdByUuid: string;
  unitOfMeasurementUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldType: Partial<FieldOfCategoryMaterial>) {
    Object.assign(this, fieldType);
    return this;
  }
}
