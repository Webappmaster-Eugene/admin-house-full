import { z } from 'zod';
import { HandbookBusinessValueSchema } from '../handbook';

export const FieldUnitMeasurementRelatedEntitiesSchema = z.object({
  handbook: HandbookBusinessValueSchema,
});
