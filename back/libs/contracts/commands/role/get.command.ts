import { z } from 'zod';
import { RoleSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const RoleGetResponseSchema = RoleSchema;

export namespace RoleGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
