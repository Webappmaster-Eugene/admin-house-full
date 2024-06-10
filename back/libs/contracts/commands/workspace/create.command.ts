import { z } from 'zod';
import { WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceCreateResponseEntitySchema = WorkspaceSchema.omit({
  createdAt: true,
  updatedAt: true,
});

const WorkspaceCreateRequestSchema = WorkspaceSchema.pick({
  name: true,
  description: true,
});

const WorkspaceCreateResponseSchema = z
  .object({
    data: WorkspaceCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceCreateCommand {
  export const RequestSchema = WorkspaceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
