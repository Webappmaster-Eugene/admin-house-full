import { z } from 'zod';

export const WorkspaceSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  workspaceCreatorUuid: z.string(),
  handbookOfWorkspaceUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
