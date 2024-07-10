import { z } from 'zod';
import { GlobalCategoryMaterialBusinessValueSchema } from '../global-category-material';
import { MaterialBusinessValueSchema } from '../material';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material';
import { HandbookBusinessValueSchema } from '../handbook';

export const CategoryMaterialRelatedEntitiesSchema = z.object({
  materials: z.array(MaterialBusinessValueSchema).nullable().optional(),
  fieldsOfCategoryMaterials: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
  globalCategoryMaterial: GlobalCategoryMaterialBusinessValueSchema,
  handbook: HandbookBusinessValueSchema,
});
