import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';

const UserAddToWorkspaceResponseEntitySchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const AddUserToWorkspaceRequestSchema = UserSchema.pick({
  uuid: true,
  memberOfWorkspaceUuid: true,
});

const AddUserToWorkspaceResponseSchema = z
  .object({
    data: UserAddToWorkspaceResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AddUserToWorkspaceCommand {
  export const RequestSchema = AddUserToWorkspaceRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AddUserToWorkspaceResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToWorkspaceResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
