import { EFieldTypeVariants, FieldType } from '@prisma/client';

export class FieldTypeEntity implements FieldType {
  uuid: string;
  description: string;
  jsType: EFieldTypeVariants;
  name: string;
  handbookUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(fieldType: Partial<FieldType>) {
    Object.assign(this, fieldType);
    return this;
  }
}
