import { z } from 'zod';

export const HandbookSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  canCustomerView: z.boolean().nullable().optional(),
  workspaceUuid: z.string().uuid().nullable().optional(),
  responsibleManagerUuid: z.string().uuid(),
  lastChangeByUserUuid: z.string().uuid().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
