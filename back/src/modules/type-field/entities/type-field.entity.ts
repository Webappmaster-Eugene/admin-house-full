import { TypeField } from '@prisma/client';

export class TypeFieldEntity implements TypeField {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(type-field: Partial<TypeField>) {
    Object.assign(this, type-field);
    return this;
  }
}
