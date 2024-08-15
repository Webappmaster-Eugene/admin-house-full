import { z } from 'zod';
import { MaterialBusinessValueSchema } from '../material/material-business-value.schema';
import { FieldOfCategoryMaterialBusinessValueSchema } from '../field-of-category-material/field-of-category-material-business-value.schema';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';
import { FieldTypeBusinessValueSchema } from '../field-type/field-type-business-value.schema';
import { FieldUnitMeasurementBusinessValueSchema } from '../field-unit-measurement/field-unit-measurement-business-value.schema';

export const CharacteristicsMaterialRelatedEntitiesSchema = z.object({
  material: MaterialBusinessValueSchema,
  fieldOfCategoryMaterial: FieldOfCategoryMaterialBusinessValueSchema,
  handbook: HandbookBusinessValueSchema,
});
