import { z } from 'zod';

export const PriceChangingSchema = z.object({
  uuid: z.string().uuid(),
  newPrice: z.number(),
  comment: z.string().nullable().optional(),
  materialUuid: z.string().uuid(),
  changedByUuid: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
