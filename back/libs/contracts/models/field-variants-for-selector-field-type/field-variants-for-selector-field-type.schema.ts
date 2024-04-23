import { z } from 'zod';

export const FieldVariantsForSelectorFieldTypeSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  fieldTypeUuid: z.string().uuid(),
  handbookUuid: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
