import { z } from 'zod';
import { AuthSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AuthRegisterWithRoleRequestParamSchema = z.object({
  roleId: z.number(),
  registerWithRoleKey: z.string(),
});

const AuthRegisterWithRoleRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  workspaceData: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  roleUuid: true,
});

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
