import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { FieldTypeSchema } from '../../models';
import { ProjectSchema } from '../../models';
import { UserSchema } from '../../models';
import { OrganizationSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const WorkspaceCreateRequestSchema = WorkspaceSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  workspaceCreatorUuid: true,
  handbookOfWorkspaceUuid: true,
});

const WorkspaceCreateResponseSchema = z
  .object({
    data: WorkspaceSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceCreateCommand {
  export const RequestSchema = WorkspaceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
