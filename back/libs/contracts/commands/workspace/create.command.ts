import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { HandbookSchema } from '../../models';
import { ProjectSchema } from '../../models';
import { UserSchema } from '../../models';
import { OrganizationSchema } from '../../models';

const WorkspaceCreateRequestSchema = WorkspaceSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  workspaceCreatorUuid: true,
  handbookOfWorkspaceUuid: true,
});

const WorkspaceCreateResponseSchema = WorkspaceSchema.merge(
  z.object({
    workspaceCreator: UserSchema,
    workspaceOrganizations: z.array(OrganizationSchema).optional(),
    workspaceProjects: z.array(ProjectSchema).optional(),
    workspaceHandbook: HandbookSchema.optional(),
  }),
);

export namespace WorkspaceCreateCommand {
  export const RequestSchema = WorkspaceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
