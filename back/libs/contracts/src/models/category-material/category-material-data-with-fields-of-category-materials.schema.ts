import { z } from 'zod';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../../models/field-of-category-material/field-of-category-material-business-value.schema';

export const CategoryMaterialDataWithFieldsOfCategoryMaterialsSchema = z.object({
  fieldsOfCategoryMaterials: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
  fieldsOfCategoryMaterialsInTemplate: z.array(FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
