import { z } from 'zod';
import { AuthSchema, AuthStrictKeySchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { ConfirmPasswordSchema } from '../../models';

const AuthRegisterResponseEntitySchema = AuthSchema;

const AuthRegisterRequestSchema = UserSchema.pick({
  email: true,
  password: true,
  address: true,
  documents: true,
  firstName: true,
  secondName: true,
  info: true,
  phone: true,
  avatar: true,
})
  .merge(ConfirmPasswordSchema)
  .refine(
    data => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords don't match",
      path: ['confirm'], // path of error
    },
  );

const AuthRegisterResponseSchema = z
  .object({
    data: AuthRegisterResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRegisterCommand {
  export const RequestSchema = AuthRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRegisterResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
