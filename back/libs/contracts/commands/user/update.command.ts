import { z } from 'zod';
import { UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const UserUpdateResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserUpdateRequestSchema = UserSchema.pick({
  avatar: true,
  info: true,
  address: true,
  secondName: true,
  documents: true,
  firstName: true,
  phone: true,
}).partial();

const UserUpdateResponseSchema = z
  .object({
    data: UserUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserUpdateCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = UserUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
