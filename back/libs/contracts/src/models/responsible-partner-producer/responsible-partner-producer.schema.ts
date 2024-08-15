import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const ResponsiblePartnerProducerSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  responsiblePartnerProducerStatus: EActiveStatusVariants,
  numInOrder: z.number().nullable().optional(),
  comment: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  handbookUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
