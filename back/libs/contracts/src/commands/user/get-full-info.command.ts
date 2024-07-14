import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { UserFullInfoBusinessValueSchema } from '../../models/user/user-full-info/user-full-info-business-value.schema';
import { ResponseClientSchema } from '../../models';
import { UserFullInfoRelatedEntitiesSchema } from '../../models/user/user-full-info/user-full-info-related-entities.schema';

const UserGetFullInfoResponseEntitySchema = UserFullInfoBusinessValueSchema.merge(UserFullInfoRelatedEntitiesSchema);

const UserGetFullInfoResponseSchema = z
  .object({
    data: UserGetFullInfoResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace UserGetFullInfoCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetFullInfoResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetFullInfoResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
