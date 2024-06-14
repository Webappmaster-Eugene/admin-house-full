import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';

const UserAddToWorkspaceResponseEntitySchema = UserSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

const UserAddToWorkspaceRequestSchema = UserSchema.pick({
  uuid: true,
  memberOfWorkspaceUuid: true,
});

const UserAddToWorkspaceResponseSchema = z
  .object({
    data: UserAddToWorkspaceResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserAddToWorkspaceCommand {
  export const RequestSchema = UserAddToWorkspaceRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserAddToWorkspaceResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserAddToWorkspaceResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
