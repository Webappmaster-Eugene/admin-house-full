import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { EntityGetCommand } from '../common/get-param.command';

const UserUpdateRequestSchema = UserSchema.omit({
  createdAt: true,
  updatedAt: true,
  creatorOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  memberOfWorkspaceUuid: true,
  workspaceData: true,
}).partial();

const UserUpdateResponseSchema = UserSchema.pick({ uuid: true });

export namespace UserUpdateCommand {
  export const RequestParamSchema = EntityGetCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = UserUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
