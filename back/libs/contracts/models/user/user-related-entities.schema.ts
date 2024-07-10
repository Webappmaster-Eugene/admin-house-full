import { z } from 'zod';
import { OrganizationBusinessValueSchema } from '../organization';
import { RoleBusinessValueSchema } from '../role';
import { WorkspaceBusinessValueSchema } from '../workspace';
import { ProjectBusinessValueSchema } from '../project';

export const UserRelatedEntitiesSchema = z.object({
  role: RoleBusinessValueSchema,
  creatorOfWorkspace: WorkspaceBusinessValueSchema.nullable().optional(),
  memberOfWorkspace: WorkspaceBusinessValueSchema.nullable().optional(),
  memberOfProject: ProjectBusinessValueSchema.nullable().optional(),
  memberOfOrganization: OrganizationBusinessValueSchema.nullable().optional(),
});
