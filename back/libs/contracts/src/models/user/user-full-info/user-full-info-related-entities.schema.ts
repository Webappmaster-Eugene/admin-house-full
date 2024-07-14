import { z } from 'zod';
import { OrganizationSchema } from '../../organization';
import { RoleSchema } from '../../role';
import { WorkspaceSchema } from '../../workspace';
import { ProjectSchema } from '../../project';
import { HandbookSchema } from '../../handbook';

export const UserFullInfoRelatedEntitiesSchema = z.object({
  role: RoleSchema,
  creatorOfWorkspace: WorkspaceSchema.nullable().optional(),
  memberOfWorkspace: WorkspaceSchema.nullable().optional(),
  memberOfOrganization: OrganizationSchema.nullable().optional(),
  leaderOfOrganizations: z.array(OrganizationSchema).nullable().optional(),
  memberOfProject: ProjectSchema.nullable().optional(),
  responsibleManagerOfProjects: z.array(ProjectSchema).nullable().optional(),
  handbookManager: HandbookSchema.nullable().optional(),
});
