import { z } from 'zod';

export const PriceChangingSchema = z.object({
  uuid: z.string().uuid(),
  oldPrice: z.number().nullable().optional(),
  newPrice: z.number(),
  source: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  materialUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
