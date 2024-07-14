import { z } from 'zod';
import { EGlobalCategoryVariants } from '../../enums';

export const GlobalCategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: EGlobalCategoryVariants,
  nameRu: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
