import { EGlobalCategoryVariantsType } from '../../../common/generated/zod';
import { GlobalCategoryMaterial } from '.prisma/client';

export class GlobalCategoryMaterialEntity implements GlobalCategoryMaterial {
  uuid: string;
  name: EGlobalCategoryVariantsType;
  nameRu: string;
  comment: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(globalCategoryMaterial: Partial<GlobalCategoryMaterial>) {
    Object.assign(this, globalCategoryMaterial);
    return this;
  }
}
