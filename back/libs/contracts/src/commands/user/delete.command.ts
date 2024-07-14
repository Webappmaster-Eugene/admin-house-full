import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { UserBusinessValueSchema } from '../../models/user/user-business-value.schema';
import { UserRelatedEntitiesSchema } from '../../models/user/user-related-entities.schema';
import { ResponseClientSchema } from '../../models';

const UserDeleteResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema);

const UserDeleteResponseSchema = z
  .object({
    data: UserDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
