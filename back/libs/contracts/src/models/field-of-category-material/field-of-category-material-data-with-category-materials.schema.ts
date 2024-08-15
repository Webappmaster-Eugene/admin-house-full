import { z } from 'zod';
import { CategoryMaterialBusinessValueSchema } from '../../models/category-material/category-material-business-value.schema';

export const FieldOfCategoryMaterialDataWithCategoryMaterials = z.object({
  categoriesMaterial: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
  //categoriesMaterialsTemplatesIncludesThisField: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
});
