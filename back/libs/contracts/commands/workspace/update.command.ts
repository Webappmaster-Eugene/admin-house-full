import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceUpdateResponseEntitySchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
});

const WorkspaceUpdateRequestSchema = WorkspaceSchema.pick({
  name: true,
  description: true,
  handbookOfWorkspaceUuid: true,
}).partial();

const WorkspaceUpdateResponseSchema = z
  .object({
    data: WorkspaceUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
