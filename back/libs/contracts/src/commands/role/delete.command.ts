import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { RoleBusinessValueSchema } from '../../models/role/role-business-value.schema';
import { EntityUrlParamCommand } from '../../commands/common';

const RoleDeleteResponseEntitySchema = RoleBusinessValueSchema;

const RoleDeleteResponseSchema = z
  .object({
    data: RoleDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
