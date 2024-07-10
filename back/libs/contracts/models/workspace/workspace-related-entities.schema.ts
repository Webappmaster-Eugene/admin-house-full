import { z } from 'zod';
import { OrganizationBusinessValueSchema } from '../organization';
import { UserBusinessValueSchema } from '../user';
import { HandbookBusinessValueSchema } from '../handbook';

export const WorkspaceRelatedEntitiesSchema = z.object({
  workspaceMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  organizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
  handbookOfWorkspace: HandbookBusinessValueSchema.nullable().optional(),
  workspaceCreator: UserBusinessValueSchema,
});
