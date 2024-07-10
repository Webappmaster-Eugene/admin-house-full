import { z } from 'zod';
import { UserBusinessValueSchema } from '../user';
import { ProjectBusinessValueSchema } from '../project';
import { WorkspaceBusinessValueSchema } from '../workspace';

export const OrganizationRelatedEntitiesSchema = z.object({
  organizationLeader: UserBusinessValueSchema,
  organizationMembers: z.array(UserBusinessValueSchema).nullable().optional(),
  projects: z.array(ProjectBusinessValueSchema).nullable().optional(),
  workspace: WorkspaceBusinessValueSchema,
});
