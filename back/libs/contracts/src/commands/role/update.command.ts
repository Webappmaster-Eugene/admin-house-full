import { z } from 'zod';
import { ResponseClientSchema, RoleSchema } from '../../models';
import { RoleBusinessValueSchema } from '../../models/role/role-business-value.schema';
import { EntityUrlParamCommand } from '../../commands/common';

const RoleUpdateResponseEntitySchema = RoleBusinessValueSchema;

const RoleUpdateRequestSchema = RoleSchema.pick({ description: true }).partial();

const RoleUpdateResponseSchema = z
  .object({
    data: RoleUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleUpdateCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = RoleUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = RoleUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = RoleUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
