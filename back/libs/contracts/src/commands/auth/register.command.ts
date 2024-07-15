import { z } from 'zod';
import { RegisterBusinessValueSchema } from '../../models/auth/register/register-business-value.schema';
import { ConfirmPasswordBusinessValueSchema } from '../../models/auth/auth-confirm-password/auth-confirm-password-business-value.schema';
import { ResponseClientSchema, UserSchema } from '../../models';
import { RegisterRelatedEntitiesSchema } from '../../models/auth/register/register-related-entities.schema';

const AuthRegisterResponseEntitySchema = RegisterBusinessValueSchema.merge(RegisterRelatedEntitiesSchema);

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
  .merge(ConfirmPasswordBusinessValueSchema)
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
  .merge(ResponseClientSchema);

export namespace AuthRegisterCommand {
  export const BusinessValueSchema = RegisterBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const RequestSchema = AuthRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRegisterResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
