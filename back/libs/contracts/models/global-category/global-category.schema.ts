import { z } from 'zod';

export const GlobalCategorySchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
