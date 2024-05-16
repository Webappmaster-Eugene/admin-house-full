import { EFieldTypeVariants, FieldType } from '.prisma/client';

export class FieldTypeEntity implements FieldType {
  uuid: string;
  description: string;
  jsType: EFieldTypeVariants;
  name: string;
  handbookUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldOfMaterial: Partial<FieldType>) {
    Object.assign(this, fieldOfMaterial);
    return this;
  }
}
