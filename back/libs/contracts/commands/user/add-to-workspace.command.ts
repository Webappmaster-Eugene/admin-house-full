import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AddUserToWorkspaceRequestSchema = UserSchema.pick({
  uuid: true,
});

const AddUserToWorkspaceResponseSchema = z
  .object({
    data: UserSchema,
  })
  .merge(ResponseClientSchema);

export namespace AddUserToWorkspaceCommand {
  export const RequestSchema = AddUserToWorkspaceRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AddUserToWorkspaceResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
