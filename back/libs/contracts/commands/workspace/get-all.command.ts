import { z } from 'zod';
import { RequestGetAllQuerySchema, WorkspaceBusinessValueSchema, WorkspaceRelatedEntitiesSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceGetAllResponseEntitySchema = z.array(WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema.strict()));

const WorkspaceGetAllResponseSchema = z
  .object({
    data: WorkspaceGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace WorkspaceGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = WorkspaceGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
