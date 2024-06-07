import { z } from 'zod';
import { ResponseClientSchema, UserSchema } from '../../models';

const UserCreateRequestSchema = UserSchema.pick({
  avatar: true,
  info: true,
  address: true,
  secondName: true,
  documents: true,
  email: true,
  password: true,
  firstName: true,
  phone: true,
});

const UserCreateResponseSchema = z
  .object({
    data: UserSchema.omit({
      password: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace UserCreateCommand {
  export const RequestSchema = UserCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
