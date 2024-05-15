import { z } from 'zod';

export const FieldUnitMeasurementSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  handbookUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
