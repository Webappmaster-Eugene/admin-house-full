import { z } from 'zod';

export const HandbookSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  canCustomerView: z.boolean().nullable(),
  workspaceUuid: z.string().nullable(),
  responsibleManagerUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
