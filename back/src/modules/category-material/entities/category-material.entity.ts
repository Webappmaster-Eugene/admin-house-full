import { CategoryMaterial, FieldOfCategoryMaterial, GlobalCategoryMaterial, Handbook, Material } from '.prisma/client';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { GlobalCategoryMaterialEntity } from 'src/modules/global-category-material/entities/global-category-material.entity';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';
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
