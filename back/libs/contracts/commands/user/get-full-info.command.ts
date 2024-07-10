import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, UserFullInfoBusinessValueSchema, UserFullInfoRelatedEntitiesSchema } from '../../models';

const UserGetFullInfoResponseEntitySchema = UserFullInfoBusinessValueSchema.merge(UserFullInfoRelatedEntitiesSchema.strict());

const UserGetFullInfoResponseSchema = z
  .object({
    data: UserGetFullInfoResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace UserGetFullInfoCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetFullInfoResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = UserGetFullInfoResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
