import { z } from 'zod';
import { RoleSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema } from '../../models';

const RoleUpdateRequestSchema = RoleSchema.pick({ description: true });

const RoleUpdateResponseSchema = z
  .object({
    data: RoleSchema,
  })
  .merge(ResponseClientSchema);

export namespace RoleUpdateCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = RoleUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = RoleUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
