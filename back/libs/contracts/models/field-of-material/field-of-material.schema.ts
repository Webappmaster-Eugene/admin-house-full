import { z } from 'zod';

export const FieldOfMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  isRequired: z.boolean().default(true),
  defaultValue: z.string().nullable(),
  categoryMaterialUuid: z.string(),
  createdByUuid: z.string(),
  handbookUuid: z.string(),
  unitOfMeasurementUuid: z.string(),
  fieldTypeUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
