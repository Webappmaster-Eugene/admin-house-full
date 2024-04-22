import { z } from 'zod';

export const Field_variants_for_selector_field_typeSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  fieldTypeUuid: z.string(),
  handbookUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
