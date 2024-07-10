import { z } from 'zod';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material';
import { HandbookBusinessValueSchema } from '../handbook';

export const FieldVariantsForSelectorFieldTypeRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
  fieldOfCategoryMaterial: FieldOfCategoryMaterialBusinessValueSchema,
});
