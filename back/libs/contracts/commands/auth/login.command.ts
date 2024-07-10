import { z } from 'zod';
import { AuthSchema, LoginBusinessValueSchema, PasswordSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthLoginResponseEntitySchema = AuthSchema;

const AuthLoginRequestSchema = UserSchema.pick({
  email: true,
}).merge(PasswordSchema.strict());

const AuthLoginResponseSchema = z
  .object({
    data: AuthLoginResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AuthLoginCommand {
  export const RequestSchema = AuthLoginRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthLoginResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthLoginResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
