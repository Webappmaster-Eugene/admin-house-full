import { unknown, z } from 'zod';
import { RoleSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const RoleGetResponseFirstSchema = RoleSchema;

const RoleGetResponseSchema = z.object({
  data: RoleSchema.pick({
    uuid: true,
    idRole: true,
    name: true,
  }).or(unknown()),
  statusCode: z.number(),
  message: z.string(),
  errors: z.array(unknown()).optional(),
  error: z.string().optional(),
});

export namespace RoleGetCommand {
  export const ResponseFirstSchema = RoleGetResponseFirstSchema;
  export type ResponseFirst = z.infer<typeof ResponseSchema>;

  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
