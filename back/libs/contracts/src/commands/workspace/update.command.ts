import { any, z } from 'zod';
import { WorkspaceBusinessValueSchema } from '../../models/workspace/workspace-business-value.schema';
import { WorkspaceSchema } from '../../models';
import { WorkspaceRelatedEntitiesSchema } from '../../models/workspace/workspace-related-entities.schema';

const WorkspaceUpdateResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema);

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
    z.object({
      statusCode: z.number(),
      message: z.string(),
      errors: z.array(any().optional().nullable()),
    }),
  );

export namespace WorkspaceUpdateCommand {
  export const RequestSchema = WorkspaceUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
