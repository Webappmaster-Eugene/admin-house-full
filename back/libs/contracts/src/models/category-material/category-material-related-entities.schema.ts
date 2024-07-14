import { z } from 'zod';
import { MaterialBusinessValueSchema } from '../material/material-business-value.schema';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material/field-of-category-material-business-value.schema';
import { GlobalCategoryMaterialBusinessValueSchema } from '../global-category-material/global-category-business-value.schema';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';

export const CategoryMaterialRelatedEntitiesSchema = z.object({
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
  fieldsOfCategoryMaterials: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
  globalCategoryMaterial: GlobalCategoryMaterialBusinessValueSchema,
  handbook: HandbookBusinessValueSchema,
});
