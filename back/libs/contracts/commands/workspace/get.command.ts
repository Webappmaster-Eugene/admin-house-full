import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const WorkspaceGetRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceGetResponseSchema = z
  .object({
    data: WorkspaceSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceGetCommand {
  export const RequestSchema = WorkspaceGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
