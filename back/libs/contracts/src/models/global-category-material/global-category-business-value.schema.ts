import { GlobalCategoryMaterialSchema } from './global-category-material.schema';

export const GlobalCategoryMaterialBusinessValueSchema = GlobalCategoryMaterialSchema.pick({
  name: true,
  nameRu: true,
  comment: true,
  color: true,
  uuid: true,
  lastChangeByUserUuid: true,
});
