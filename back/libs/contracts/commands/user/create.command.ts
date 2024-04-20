import { unknown, z } from 'zod';
import { RoleSchema, UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const UserCreateRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  workspaceData: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  roleUuid: true,
});

const UserCreateResponseSchema = z
  .object({
    data: UserSchema.omit({
      password: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace UserCreateCommand {
  export const RequestSchema = UserCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
