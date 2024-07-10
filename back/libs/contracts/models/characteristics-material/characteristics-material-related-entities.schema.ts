import { z } from 'zod';
import { HandbookSchema } from '../handbook';
import { MaterialBusinessValueSchema, MaterialSchema } from '../material';
import { FieldOfCategoryMaterialBusinessValueSchema, FieldOfCategoryMaterialSchema } from '../field-of-category-material';
import { FieldTypeBusinessValueSchema, FieldTypeSchema } from '../field-type';
import { FieldUnitMeasurementBusinessValueSchema, FieldUnitMeasurementSchema } from '../field-unit-measurement';
import { HandbookBusinessValueSchema } from '../handbook';

export const CharacteristicsMaterialRelatedEntitiesSchema = z.object({
  material: MaterialBusinessValueSchema,
  fieldOfCategoryMaterial: FieldOfCategoryMaterialBusinessValueSchema,
  handbook: HandbookBusinessValueSchema,
  fieldType: FieldTypeBusinessValueSchema,
  fieldUnitMeasurement: FieldUnitMeasurementBusinessValueSchema,
});
