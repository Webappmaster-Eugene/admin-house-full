import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { WorkspaceBusinessValueSchema } from '../../models/workspace/workspace-business-value.schema';
import { WorkspaceRelatedEntitiesSchema } from '../../models/workspace/workspace-related-entities.schema';

const WorkspaceGetAllResponseEntitySchema = z.array(WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema));

const WorkspaceGetAllResponseSchema = z
  .object({
    data: WorkspaceGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = WorkspaceGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
