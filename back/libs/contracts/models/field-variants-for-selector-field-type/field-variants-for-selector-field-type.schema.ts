import { z } from 'zod';

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  uuid: z.string().uuid(),
  value: z.string(),
  description: z.string().optional().nullable(),
  handbookUuid: z.string().uuid(),
  fieldOfCategoryMaterialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
