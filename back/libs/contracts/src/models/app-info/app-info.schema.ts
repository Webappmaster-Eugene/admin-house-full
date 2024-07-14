import { z } from 'zod';
import { ECurrencyVariants, ELanguagesVariants, EAppStatusVariants } from '../../enums';

export const AppInfoSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  status: EAppStatusVariants.nullable().optional(),
  language: ELanguagesVariants.nullable().optional(),
  currency: ECurrencyVariants.nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
