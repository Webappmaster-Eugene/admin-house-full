import { z } from 'zod';
import { EGlobalCategoryVariants } from '../../enums';

export const GlobalCategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: EGlobalCategoryVariants,
  nameRu: z.string(),
  comment: z.string().nullable().optional(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
