import { z } from 'zod';
import { ECurrencyVariants, ELanguagesVariants, EStatusVariants } from '../../enums';

export const AppInfoSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  comment: z.string(),
  status: EStatusVariants,
  language: ELanguagesVariants,
  currency: ECurrencyVariants,
});