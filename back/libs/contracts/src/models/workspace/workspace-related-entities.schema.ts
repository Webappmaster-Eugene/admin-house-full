import { z } from 'zod';
import { UserBusinessValueSchema } from '../user/user-business-value.schema';
import { OrganizationBusinessValueSchema } from '../organization/organization-business-value.schema';
import { HandbookBusinessValueSchema } from '../handbook/handbook-business-value.schema';

export const WorkspaceRelatedEntitiesSchema = z.object({
  workspaceMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  organizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
  handbookOfWorkspace: HandbookBusinessValueSchema.nullable().optional(),
  workspaceCreator: UserBusinessValueSchema,
});
