import { z } from 'zod';

export const MaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  namePublic: z.boolean().nullable().optional(),
  handbookUuid: z.string().uuid(),
  price: z.number(),
  unitMeasurementUuid: z.string().uuid(),
  categoryUuid: z.string().uuid(),
  responsiblePartnerUuid: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
