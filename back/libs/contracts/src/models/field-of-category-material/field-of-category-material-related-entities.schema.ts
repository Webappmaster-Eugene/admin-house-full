import { z } from 'zod';
import { CategoryMaterialBusinessValueSchema } from '../category-material/category-material-business-value.schema';
import { FieldVariantsForSelectorFieldTypeBusinessValueSchema } from '../field-variants-for-selector-field-type/field-variants-for-selector-field-type-business-value.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement/field-unit-measurement-business-value.schema';
import { FieldTypeBusinessValueSchema } from '../field-type/field-type-business-value.schema';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';

export const FieldOfCategoryMaterialRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
  categoriesMaterial: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
  categoriesMaterialsTemplatesIncludesThisField: z.array(CategoryMaterialBusinessValueSchema).nullable().optional(),
  fieldType: FieldTypeBusinessValueSchema,
  unitOfMeasurement: FieldUnitMeasurementBusinessValueSchema,
  fieldVariantsForSelectorFieldType: z.array(FieldVariantsForSelectorFieldTypeBusinessValueSchema).nullable().optional(),
});
