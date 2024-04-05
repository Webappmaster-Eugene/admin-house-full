import { z } from 'zod';

export const HandbookSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  canCustomerView: z.boolean().nullable(),
  workspaceHandbookUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
