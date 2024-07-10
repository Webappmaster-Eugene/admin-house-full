import { z } from 'zod';
import { ConfirmPasswordBusinessValueSchema, RegisterBusinessValueSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthRegisterResponseEntitySchema = RegisterBusinessValueSchema;

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
  .merge(ConfirmPasswordBusinessValueSchema.strict())
  .refine(
    (data: { password: any; confirmPassword: any }) => {
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
  .merge(ResponseClientSchema.strict());

export namespace AuthRegisterCommand {
  export const RequestSchema = AuthRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRegisterResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
