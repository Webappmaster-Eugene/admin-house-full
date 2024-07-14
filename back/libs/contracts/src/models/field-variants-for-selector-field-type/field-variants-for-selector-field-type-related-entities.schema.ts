import { z } from 'zod';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material/field-of-category-material-business-value.schema';

export const FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
  fieldOfCategoryMaterial: FieldOfCategoryMaterialBusinessValueSchema,
});
