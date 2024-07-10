import { z } from 'zod';
import { ResponseClientSchema, UserBusinessValueSchema, UserRelatedEntitiesSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserGetResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema.strict());

const UserGetResponseSchema = z
  .object({
    data: UserGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
