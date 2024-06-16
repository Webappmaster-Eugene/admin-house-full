import { z } from 'zod';

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  uuid: z.string().uuid(),
  value: z.string(),
  description: z.string().nullable().optional(),
  handbookUuid: z.string().uuid(),
  fieldOfCategoryMaterialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
