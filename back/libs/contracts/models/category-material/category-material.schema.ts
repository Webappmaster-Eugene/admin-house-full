import { z } from 'zod';

export const CategoryMaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  templateName: z.string().nullable().optional(),
  globalCategoryMaterialUuid: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});