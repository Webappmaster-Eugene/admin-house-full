import { z } from 'zod';

export const FieldOfCategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  uniqueNameForTemplate: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  isRequired: z.boolean().default(true),
  defaultValue: z.string().nullable().optional(),
  categoryMaterialUuid: z.string().uuid(),
  handbookUuid: z.string().uuid(),
  unitOfMeasurementUuid: z.string().uuid(),
  fieldTypeUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
