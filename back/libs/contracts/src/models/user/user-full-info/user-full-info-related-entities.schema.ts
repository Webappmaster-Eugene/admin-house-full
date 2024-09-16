import { z } from 'zod';
import { RoleBusinessValueSchema } from '../../role/role-business-value.schema';
import { WorkspaceBusinessValueSchema } from '../../workspace/workspace-business-value.schema';
import { HandbookBusinessValueSchema } from '../../handbook/handbook-business-value.schema';
import { ProjectBusinessValueSchema } from '../../project/project-business-value.schema';
import { OrganizationBusinessValueSchema } from '../../organization/organization-business-value.schema';

export const UserFullInfoRelatedEntitiesSchema = z.object({
  roles: z.array(RoleBusinessValueSchema).nullable().optional(),
  customerOfProjects: z.array(ProjectBusinessValueSchema).nullable().optional(),
  handbookManager: HandbookBusinessValueSchema.nullable().optional(),
  responsibleManagerOfProjects: z.array(ProjectBusinessValueSchema).nullable().optional(),
  creatorOfWorkspace: WorkspaceBusinessValueSchema.nullable().optional(),
  leaderOfOrganizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
  memberOfWorkspaces: z.array(WorkspaceBusinessValueSchema).nullable().optional(),
  memberOfProjects: z.array(ProjectBusinessValueSchema).nullable().optional(),
  memberOfOrganizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
});
