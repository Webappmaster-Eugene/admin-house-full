import { z } from 'zod';
import { EFieldTypeVariants } from '../../enums';

export const FieldTypeSchema = z.object({
  jsType: EFieldTypeVariants,
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
