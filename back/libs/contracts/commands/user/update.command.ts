import { z } from 'zod';
import { UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models/response-client';

const UserUpdateRequestSchema = UserSchema.pick({
  firstName: true,
  secondName: true,
  avatar: true,
  phone: true,
  info: true,
  documents: true,
  address: true,
  memberOfWorkspaceUuid: true,
  memberOfOrganizationUuid: true,
  memberOfProjectUuid: true,
}).partial();

const UserUpdateResponseSchema = z
  .object({
    data: UserSchema.omit({
      password: true,
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace UserUpdateCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = UserUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
