import { z } from 'zod';

export const FieldCategorySchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  isRequired: z.boolean().nullable().optional().default(false),
  defaultValue: z.string().nullable().optional(),
  categoryUuid: z.string().uuid(),
  createdByUuid: z.string().uuid(),
  unitOfMeasurementUuid: z.string().uuid(),
  fieldTypeUuid: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
