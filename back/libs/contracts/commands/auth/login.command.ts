import { z } from 'zod';
import { AuthSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthLoginResponseEntitySchema = AuthSchema;

export const PasswordSchema = z.object({
  password: z.string(),
});

const AuthLoginRequestSchema = UserSchema.pick({
  email: true,
}).merge(PasswordSchema);

const AuthLoginResponseSchema = z
  .object({
    data: AuthLoginResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthLoginCommand {
  export const RequestSchema = AuthLoginRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthLoginResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthLoginResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
