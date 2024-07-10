import { z } from 'zod';
import { RoleBusinessValueSchema, RoleSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const RoleGetResponseEntitySchema = RoleBusinessValueSchema;

const RoleGetResponseSchema = z
  .object({
    data: RoleGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace RoleGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
