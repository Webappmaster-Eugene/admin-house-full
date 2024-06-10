import { z } from 'zod';
import { UserSchema, WorkspaceSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const WorkspaceChangeOwnerResponseEntitySchema = WorkspaceSchema.pick({
  uuid: true,
  name: true,
  workspaceCreatorUuid: true,
});

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
