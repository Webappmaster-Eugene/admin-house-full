import { z } from 'zod';

export const ResponsiblePartnerProducerSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  comment: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  handbookId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
