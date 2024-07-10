import { any, z } from 'zod';
import { WorkspaceBusinessValueSchema, WorkspaceRelatedEntitiesSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceUpdateResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema.strict());

const WorkspaceUpdateRequestSchema = WorkspaceSchema.pick({
  name: true,
  description: true,
  handbookOfWorkspaceUuid: true,
}).partial();

const WorkspaceUpdateResponseSchema = z
  .object({
    data: WorkspaceUpdateResponseEntitySchema,
  })
  .merge(
    z
      .object({
        statusCode: z.number(),
        message: z.string(),
        errors: z.array(any()).optional().nullable(),
      })
      .strict(),
  );

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
