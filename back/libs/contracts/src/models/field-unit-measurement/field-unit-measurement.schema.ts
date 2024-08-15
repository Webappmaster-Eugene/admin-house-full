import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const FieldUnitMeasurementSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  numInOrder: z.number().nullable().optional(),
  fieldUnitMeasurementStatus: EActiveStatusVariants,
  handbookUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
