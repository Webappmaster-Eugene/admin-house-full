import { z } from 'zod';
import { HandbookSchema } from '../handbook';
import { FieldTypeSchema } from '../field-type';
import { FieldUnitMeasurementSchema } from '../field-unit-measurement';
import { CategoryMaterialSchema } from '../category-material';
import { FieldVariantsForSelectorFieldTypeSchema } from '../field-variants-for-selector-field-type';

export const FieldOfCategoryMaterialRelatedEntitiesSchema = z.object({
  categoryMaterial: CategoryMaterialSchema,
  handbook: HandbookSchema,
  fieldType: FieldTypeSchema,
  unitOfMeasurement: FieldUnitMeasurementSchema,
  fieldVariantsForSelectorFieldType: z.array(FieldVariantsForSelectorFieldTypeSchema).nullable().optional(),
});
