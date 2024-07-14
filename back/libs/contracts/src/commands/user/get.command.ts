import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { UserBusinessValueSchema } from '../../models/user/user-business-value.schema';
import { ResponseClientSchema } from '../../models';
import { UserRelatedEntitiesSchema } from '../../models/user/user-related-entities.schema';

const UserGetResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema);

const UserGetResponseSchema = z
  .object({
    data: UserGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
