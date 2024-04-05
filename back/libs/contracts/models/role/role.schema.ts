import { z } from 'zod';
import { EUserTypeVariantsSchema } from '../../../../src/generated/zod';

export const RoleSchema = z.object({
  uuid: z.string().uuid(),
  id: z.number().int(),
  name: EUserTypeVariantsSchema,
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
