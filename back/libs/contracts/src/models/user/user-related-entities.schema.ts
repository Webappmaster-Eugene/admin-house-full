import { z } from 'zod';
import { RoleBusinessValueSchema } from '../role/role-business-value.schema';
import { WorkspaceBusinessValueSchema } from '../workspace/workspace-business-value.schema';
import { ProjectBusinessValueSchema } from '../project/project-business-value.schema';
import { OrganizationBusinessValueSchema } from '../organization/organization-business-value.schema';

export const UserRelatedEntitiesSchema = z.object({
  role: RoleBusinessValueSchema,
  creatorOfWorkspace: WorkspaceBusinessValueSchema.nullable().optional(),
  memberOfWorkspace: WorkspaceBusinessValueSchema.nullable().optional(),
  memberOfProject: ProjectBusinessValueSchema.nullable().optional(),
  memberOfOrganization: OrganizationBusinessValueSchema.nullable().optional(),
});