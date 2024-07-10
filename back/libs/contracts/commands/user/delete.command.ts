import { z } from 'zod';
import { ResponseClientSchema, UserBusinessValueSchema, UserRelatedEntitiesSchema, UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserDeleteResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserDeleteResponseSchema = z
  .object({
    data: UserDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
