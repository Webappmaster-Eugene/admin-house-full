import { z } from 'zod';
import { WorkspaceBusinessValueSchema, WorkspaceRelatedEntitiesSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceCreateResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema.strict());

const WorkspaceCreateRequestSchema = WorkspaceSchema.pick({
  name: true,
  description: true,
});

const WorkspaceCreateResponseSchema = z
  .object({
    data: WorkspaceCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace WorkspaceCreateCommand {
  export const RequestSchema = WorkspaceCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
