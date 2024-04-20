import { z } from 'zod';
import {
  ECurrencyTypeVariantsSchema,
  ELanguagesTypeVariantsSchema,
  EStatusAppSchema,
} from '../../../../src/common/generated/zod';

export const AppInfoSchema = z.object({
  uuid: z.string().uuid(),
  status: EStatusAppSchema,
  language: ELanguagesTypeVariantsSchema,
  currency: ECurrencyTypeVariantsSchema,
  name: z.string(),
  description: z.string(),
  comment: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
