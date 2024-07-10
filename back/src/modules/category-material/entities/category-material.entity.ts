import { CategoryMaterial } from '.prisma/client';
import { HandbookEntity } from 'src/modules/handbook/entities/handbook.entity';
import { GlobalCategoryMaterialEntity } from 'src/modules/global-category-material/entities/global-category-material.entity';
import { FieldOfCategoryMaterialEntity } from 'src/modules/field-of-category-material/entities/field-of-category-material.entity';
import { MaterialEntity } from 'src/modules/material/entities/material.entity';

export interface CategoryMaterialRelatedEntities {
  materials: MaterialEntity[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterialEntity[];
  globalCategoryMaterial: GlobalCategoryMaterialEntity;
  handbook: HandbookEntity;
}

export class CategoryMaterialEntity implements CategoryMaterial, CategoryMaterialRelatedEntities {
  uuid: string;
  name: string;
  comment: string;
  globalCategoryMaterialUuid: string;
  handbookUuid: string;
  templateName: string;
  lastChangeByUserUuid: string;
  createdAt: Date;
  updatedAt: Date;
  materials: MaterialEntity[];
  fieldsOfCategoryMaterials: FieldOfCategoryMaterialEntity[];
  globalCategoryMaterial: GlobalCategoryMaterialEntity;
  handbook: HandbookEntity;

  constructor(categoryMaterial: Partial<CategoryMaterial>) {
    Object.assign(this, categoryMaterial);
    return this;
  }
}
