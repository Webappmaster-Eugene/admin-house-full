import { z } from 'zod';
import { RoleSchema } from '../../models/role';
import { EntityGetCommand } from '../common/get-param.command';

const RoleUpdateRequestSchema = RoleSchema.pick({ description: true });

const RoleUpdateResponseSchema = RoleSchema.pick({ uuid: true });

export namespace RoleUpdateCommand {
  export const RequestParamSchema = EntityGetCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = RoleUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = RoleUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
