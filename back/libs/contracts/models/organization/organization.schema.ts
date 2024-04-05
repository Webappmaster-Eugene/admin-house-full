import { z } from 'zod';

export const OrganizationSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  workspaceUuid: z.string(),
  organizationLeaderUuid: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
