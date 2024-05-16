import { CategoryMaterial } from '.prisma/client';

export class CategoryMaterialEntity implements CategoryMaterial {
  uuid: string;
  name: string;
  comment: string;
  globalCategoryMaterialUuid: string;
  handbookUuid: string;
  templateName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(categoryMaterial: Partial<CategoryMaterial>) {
    Object.assign(this, categoryMaterial);
    return this;
  }
}
