import { z } from 'zod';
import { AuthSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthLoginRequestSchema = UserSchema.pick({
  email: true,
  password: true,
});

const AuthLoginResponseSchema = z
  .object({
    data: AuthSchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthLoginCommand {
  export const RequestSchema = AuthLoginRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthLoginResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
