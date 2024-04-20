import { unknown, z } from 'zod';
import { AuthSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AuthRegisterRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  workspaceData: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  roleUuid: true,
});

const AuthRegisterResponseSchema = z
  .object({
    data: AuthSchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRegisterCommand {
  export const RequestSchema = AuthRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
