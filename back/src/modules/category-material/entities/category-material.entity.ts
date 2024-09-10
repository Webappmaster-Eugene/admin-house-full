import { CategoryMaterial, FieldOfCategoryMaterial, GlobalCategoryMaterial, Handbook, Material } from '.prisma/client';
import { EActiveStatuses } from '.prisma/client';

export interface CategoryMaterialRelatedEntities {
  materials: Material[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterial[];
  fieldsOfCategoryMaterialsInTemplate: FieldOfCategoryMaterial[];
  globalCategoryMaterial: GlobalCategoryMaterial;
  handbook: Handbook;
}

export class CategoryMaterialEntity implements CategoryMaterial, CategoryMaterialRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  numInOrder: number;
  categoryMaterialStatus: EActiveStatuses;
  globalCategoryMaterialUuid: string;
  handbookUuid: string;
  templateName: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  materials: Material[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterial[];
  fieldsOfCategoryMaterialsInTemplate: FieldOfCategoryMaterial[];
  globalCategoryMaterial: GlobalCategoryMaterial;
  handbook: Handbook;

  constructor(categoryMaterial: Partial<CategoryMaterial>) {
    Object.assign(this, categoryMaterial);
    return this;
  }
}
