import { z } from 'zod';
import { RoleBusinessValueSchema, RoleSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const RoleDeleteResponseEntitySchema = RoleBusinessValueSchema;

const RoleDeleteResponseSchema = z
  .object({
    data: RoleDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace RoleDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
