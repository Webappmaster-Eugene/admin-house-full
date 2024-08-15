import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, UserSchema } from '../../models';
import { UserRelatedEntitiesSchema } from '../../models/user/user-related-entities.schema';
import { UserBusinessValueSchema } from '../../models/user/user-business-value.schema';

const UserUpdateResponseEntitySchema = UserBusinessValueSchema.merge(UserRelatedEntitiesSchema);

const UserUpdateRequestSchema = z.object({ roles: z.array(z.number()).nullable().optional() });

const UserUpdateResponseSchema = z
  .object({
    data: UserUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserUpdateRolesCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = UserUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
