import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const WorkspaceUpdateRequestSchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
  workspaceCreatorUuid: true,
  uuid: true,
}).partial();

const WorkspaceUpdateResponseSchema = z
  .object({
    data: WorkspaceSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
