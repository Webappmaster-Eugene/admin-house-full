import { z } from 'zod';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';

export const FieldUnitMeasurementRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
});
