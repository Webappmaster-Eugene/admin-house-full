import { z } from 'zod';
import { WorkspaceSchema } from '../../models/workspace';
import { HandbookSchema } from '../../models/handbook';
import { ProjectSchema } from '../../models/project';
import { UserSchema } from '../../models/user';
import { OrganizationSchema } from '../../models/organization';

const WorkspaceCreateRequestSchema = WorkspaceSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const WorkspaceCreateResponseSchema = WorkspaceSchema.merge(
  z.object({
    workspaceCreator: UserSchema,
    workspaceOrganizations: z.array(OrganizationSchema),
    workspaceProjects: z.array(ProjectSchema),
    workspaceHandbook: HandbookSchema,
  }),
);

export namespace WorkspaceCreateCommand {
  export const RequestSchema = WorkspaceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
