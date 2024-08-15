import { CategoryMaterialSchema } from '../category-material';

export const CategoryMaterialBusinessValueSchema = CategoryMaterialSchema.pick({
  name: true,
  templateName: true,
  comment: true,
  uuid: true,
  globalCategoryMaterialUuid: true,
  numInOrder: true,
  categoryMaterialStatus: true,
  lastChangeByUserUuid: true,
});
