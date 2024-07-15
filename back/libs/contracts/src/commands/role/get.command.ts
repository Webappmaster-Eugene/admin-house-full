import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { RoleBusinessValueSchema } from '../../models/role/role-business-value.schema';
import { EntityUrlParamCommand } from '../../commands/common';

const RoleGetResponseEntitySchema = RoleBusinessValueSchema;

const RoleGetResponseSchema = z
  .object({
    data: RoleGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleGetCommand {
  export const BusinessValueSchema = RoleBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
