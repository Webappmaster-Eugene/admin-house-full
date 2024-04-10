import { z } from 'zod';
import { WorkspaceSchema } from '../../models';

const WorkspaceUpdateRequestSchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
  handbookOfWorkspaceUuid: true,
  workspaceCreatorUuid: true,
  uuid: true,
}).partial();

const WorkspaceUpdateResponseSchema = WorkspaceSchema.pick({ uuid: true });

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
