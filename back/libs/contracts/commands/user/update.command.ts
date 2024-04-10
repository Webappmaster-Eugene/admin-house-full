import { z } from 'zod';
import { UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserUpdateRequestSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  creatorOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  memberOfWorkspaceUuid: true,
  workspaceData: true,
  uuid: true,
  roleUuid: true,
  email: true,
  password: true,
}).partial();

const UserUpdateResponseSchema = UserSchema.pick({ uuid: true });

export namespace UserUpdateCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = UserUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
