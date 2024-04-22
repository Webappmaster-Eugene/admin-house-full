import { CategoryMaterial } from '@prisma/client';

export class CategoryMaterialEntity implements CategoryMaterial {
  uuid: string;
  description: string;
  name: string;
  canCustomerView: boolean;
  responsibleManagerUuid: string;
  workspaceUuid: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(category-material: Partial<CategoryMaterial>) {
    Object.assign(this, category-material);
    return this;
  }
}
