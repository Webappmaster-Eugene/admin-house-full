import { z } from 'zod';
import { ResponseClientSchema, WorkspaceSchema } from '../../models';
import { WorkspaceBusinessValueSchema } from '../../models/workspace/workspace-business-value.schema';
import { WorkspaceRelatedEntitiesSchema } from '../../models/workspace/workspace-related-entities.schema';

const WorkspaceGetResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema);

const WorkspaceGetRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceGetResponseSchema = z
  .object({
    data: WorkspaceGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceGetCommand {
  export const RequestSchema = WorkspaceGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
