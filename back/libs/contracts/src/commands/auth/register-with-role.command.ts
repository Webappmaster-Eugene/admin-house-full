import { z } from 'zod';
import { RegisterBusinessValueSchema } from '../../models/auth/register/register-business-value.schema';
import { ResponseClientSchema, UserSchema } from '../../models';
import { ConfirmPasswordBusinessValueSchema } from '../../models/auth/auth-confirm-password/auth-confirm-password-business-value.schema';
import { RegisterRelatedEntitiesSchema } from '../../models/auth/register/register-related-entities.schema';

const AuthRegisterWithRoleResponseEntitySchema = RegisterBusinessValueSchema.merge(RegisterRelatedEntitiesSchema);

const AuthRegisterWithRoleRequestParamSchema = z.object({
  roleId: z.number().gte(1).lte(4),
  registerWithRoleKey: z.string(),
});

const AuthRegisterWithRoleRequestSchema = UserSchema.pick({
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

const AuthRegisterWithRoleResponseSchema = z
  .object({
    data: AuthRegisterWithRoleResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRegisterWithRoleCommand {
  export const BusinessValueSchema = RegisterBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const RequestParamSchema = AuthRegisterWithRoleRequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = AuthRegisterWithRoleRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterWithRoleResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRegisterWithRoleResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
