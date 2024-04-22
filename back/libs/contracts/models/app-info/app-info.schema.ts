import { z } from 'zod';
import {
  ECurrencyTypeVariantsSchema,
  ELanguagesTypeVariantsSchema,
  EStatusAppSchema,
} from '../../../../src/common/generated/zod';

export const AppInfoSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  comment: z.string(),
  status: EStatusAppSchema,
  language: ELanguagesTypeVariantsSchema,
  currency: ECurrencyTypeVariantsSchema,
});
