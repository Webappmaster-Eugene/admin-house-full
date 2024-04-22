import { GlobalCategory } from '@prisma/client';
import { EGlobalCategoryVariantsType } from '../../../common/generated/zod';

export class GlobalCategoryEntity implements GlobalCategory {
  uuid: string;
  name: EGlobalCategoryVariantsType;
  nameRu: string;
  comment: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(globalCategory: Partial<GlobalCategory>) {
    Object.assign(this, globalCategory);
    return this;
  }
}
