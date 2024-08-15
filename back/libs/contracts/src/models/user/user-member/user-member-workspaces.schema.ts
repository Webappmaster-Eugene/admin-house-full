import { z } from 'zod';
import { WorkspaceBusinessValueSchema } from '../../../models/workspace/workspace-business-value.schema';

export const UserMemberOfWorkspacesSchema = z.object({
  memberOfWorkspaces: z.array(WorkspaceBusinessValueSchema).nullable().optional(),
});
