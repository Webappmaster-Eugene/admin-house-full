import { z } from 'zod';

export const WorkspaceSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().optional().default('Workspace'),
  description: z.string().nullable().optional().default('A working space to manage work'),
  workspaceCreatorUuid: z.string(),
  handbookOfWorkspaceUuid: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
