import { z } from 'zod';
import { AuthSchema, ConfirmPasswordSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthRegisterWithRoleRequestParamSchema = z.object({
  roleId: z.number().gte(1).lte(4),
  registerWithRoleKey: z.string(),
});

const AuthRegisterWithRoleRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  roleUuid: true,
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

const AuthRegisterWithRoleResponseSchema = z
  .object({
    data: AuthSchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRegisterWithRoleCommand {
  export const RequestParamSchema = AuthRegisterWithRoleRequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = AuthRegisterWithRoleRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterWithRoleResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
