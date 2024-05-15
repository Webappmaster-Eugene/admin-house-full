import { z } from 'zod';
import { EFieldTypeVariantsSchema } from '../../../../src/common/generated/zod';

export const FieldTypeSchema = z.object({
  jsType: EFieldTypeVariantsSchema,
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
