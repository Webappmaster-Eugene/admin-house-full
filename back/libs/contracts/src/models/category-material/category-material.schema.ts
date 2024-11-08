import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const CategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  isDefault: z.boolean().default(false),
  categoryMaterialStatus: EActiveStatusVariants.nullish().default('ACTIVE'),
  numInOrder: z.number().nullable().optional(),
  comment: z.string().nullable().optional(),
  templateName: z.string().nullable().optional(),
  globalCategoryMaterialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
