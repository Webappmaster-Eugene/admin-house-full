import { z } from 'zod';
import { EGlobalCategoryVariantsSchema } from '../../../../src/common/generated/zod';

export const GlobalCategorySchema = z.object({
  uuid: z.string().uuid(),
  name: EGlobalCategoryVariantsSchema,
  nameRu: z.string(),
  comment: z.string().nullable(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
