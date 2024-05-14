import { FieldVariantsForSelectorFieldType } from '@prisma/client';

export class FieldVariantsForSelectorFieldTypeEntity
  implements FieldVariantsForSelectorFieldType
{
  uuid: string;
  name: string;
  description: string;
  fieldTypeUuid: string;
  handbookUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    fieldVariantsForSelectorFieldType: Partial<FieldVariantsForSelectorFieldType>,
  ) {
    Object.assign(this, fieldVariantsForSelectorFieldType);
    return this;
  }
}
