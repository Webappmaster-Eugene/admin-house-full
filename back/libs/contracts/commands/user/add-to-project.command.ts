import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AddUserToProjectRequestSchema = UserSchema.pick({
  uuid: true,
});

const AddUserToProjectResponseSchema = z
  .object({
    data: UserSchema,
  })
  .merge(ResponseClientSchema);

export namespace AddUserToProjectCommand {
  export const RequestSchema = AddUserToProjectRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AddUserToProjectResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
