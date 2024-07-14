import { z } from 'zod';
import { ResponseClientSchema, WorkspaceSchema } from '../../models';
import { WorkspaceBusinessValueSchema } from '../../models/workspace/workspace-business-value.schema';
import { WorkspaceRelatedEntitiesSchema } from '../../models/workspace/workspace-related-entities.schema';

const WorkspaceCreateResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema);

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
