import { z } from 'zod';
import { RoleSchema } from '../../models/role';
import { EntityGetCommand } from '../common/get-param.command';

const RoleGetResponseSchema = RoleSchema;

export namespace RoleGetCommand {
  export const RequestParamSchema = EntityGetCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
