import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';

const AddUserToWorkspaceRequestSchema = UserSchema.pick({
  uuid: true,
  memberOfWorkspaceUuid: true,
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
