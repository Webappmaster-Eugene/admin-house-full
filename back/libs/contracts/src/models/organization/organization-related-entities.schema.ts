import { z } from 'zod';
import { UserBusinessValueSchema } from '../user/user-business-value.schema';
import { ProjectBusinessValueSchema } from '../project/project-business-value.schema';
import { WorkspaceBusinessValueSchema } from '../workspace/workspace-business-value.schema';

export const OrganizationRelatedEntitiesSchema = z.object({
  organizationLeader: UserBusinessValueSchema,
  organizationMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  projects: z.array(ProjectBusinessValueSchema).nullable().optional(),
  workspace: WorkspaceBusinessValueSchema,
});
