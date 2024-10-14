import { CategoryMaterialSchema } from '../category-material';
import { z } from 'zod';

export const CategoryMaterialBusinessValueSchema = CategoryMaterialSchema.pick({
  name: true,
  templateName: true,
  isDefault: true,
  comment: true,
  uuid: true,
  globalCategoryMaterialUuid: true,
  numInOrder: true,
  categoryMaterialStatus: true,
  lastChangeByUserUuid: true,
});
