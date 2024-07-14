import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { WorkspaceBusinessValueSchema } from '../../models/workspace/workspace-business-value.schema';
import { WorkspaceRelatedEntitiesSchema } from '../../models/workspace/workspace-related-entities.schema';

const WorkspaceChangeOwnerResponseEntitySchema = WorkspaceBusinessValueSchema.merge(WorkspaceRelatedEntitiesSchema);

const WorkspaceChangeOwnerRequestSchema = UserSchema.pick({
  uuid: true,
});

const WorkspaceChangeOwnerResponseSchema = z
  .object({
    data: WorkspaceChangeOwnerResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace WorkspaceChangeOwnerCommand {
  export const RequestSchema = WorkspaceChangeOwnerRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = WorkspaceChangeOwnerResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = WorkspaceChangeOwnerResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
