import { z } from 'zod';

export const WorkspaceSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().optional().default('Workspace'),
  description: z.string().nullable().optional().default('A working space to manage work'),
  workspaceCreatorUuid: z.string().uuid(),
  handbookOfWorkspaceUuid: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
