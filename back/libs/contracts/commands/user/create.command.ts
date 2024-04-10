import { z } from 'zod';
import { UserSchema } from '../../models';

const UserCreateRequestSchema = UserSchema.omit({
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  workspaceData: true,
  creatorOfWorkspaceUuid: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
});

const UserCreateResponseSchema = UserSchema.pick({
  password: true,
});

export namespace UserCreateCommand {
  export const RequestSchema = UserCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
