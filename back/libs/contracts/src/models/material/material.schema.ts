import { z } from 'zod';

export const MaterialSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  namePublic: z.string().nullable().optional(),
  sourceInfo: z.string().nullable().optional(),
  handbookUuid: z.string().uuid(),
  price: z.number(),
  unitMeasurementUuid: z.string().uuid(),
  categoryMaterialUuid: z.string().uuid(),
  responsiblePartnerUuid: z.string().uuid().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});