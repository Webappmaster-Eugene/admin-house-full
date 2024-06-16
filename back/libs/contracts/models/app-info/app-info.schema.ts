import { z } from 'zod';
import { ECurrencyVariants, ELanguagesVariants, EStatusVariants } from '../../enums';

export const AppInfoSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  status: EStatusVariants.nullable().optional(),
  language: ELanguagesVariants.nullable().optional(),
  currency: ECurrencyVariants.nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
