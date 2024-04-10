import { z } from 'zod';
import { UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const RoleDeleteResponseSchema = UserSchema.pick({ uuid: true });

export namespace RoleDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = RoleDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
