import { z } from 'zod';
import { EApproveStatusVariants } from '../../enums';

export const StatusApproveSchema = z.object({
  uuid: z.string().uuid(),
  name: EApproveStatusVariants,
  nameRu: z.string(),
  comment: z.string().nullable().optional(),
  lastChangeByUserUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
