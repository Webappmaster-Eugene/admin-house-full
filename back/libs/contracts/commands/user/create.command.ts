import { z } from 'zod';
import { UserSchema } from '../../models/user';

const UserCreateRequestSchema = UserSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const UserCreateResponseSchema = UserSchema;

export namespace UserCreateCommand {
  export const RequestSchema = UserCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
