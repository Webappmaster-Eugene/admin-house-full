import { Material } from '@prisma/client';

export class MaterialEntity implements Material {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(material: Partial<Material>) {
    Object.assign(this, material);
    return this;
  }
}
