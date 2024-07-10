import { z } from 'zod';
import { WorkspaceBusinessValueSchema, WorkspaceRelatedEntitiesSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceGetResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema.strict());

const WorkspaceGetRequestSchema = WorkspaceSchema.pick({
  uuid: true,
});

const WorkspaceGetResponseSchema = z
  .object({
    data: WorkspaceGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace WorkspaceGetCommand {
  export const RequestSchema = WorkspaceGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
