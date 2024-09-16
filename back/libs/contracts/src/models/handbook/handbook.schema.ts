import { z } from 'zod';
import { EActiveStatusVariants } from '../../enums';

export const HandbookSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  handbookStatus: EActiveStatusVariants.nullish().default('ACTIVE'),
  description: z.string().nullable().optional(),
  canCustomerView: z.boolean().nullable().optional(),
  workspaceUuid: z.string().uuid().nullable().optional(),
  responsibleManagerUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
