import { z } from 'zod';
import { UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserDeleteResponseSchema = UserSchema.pick({ uuid: true });

export namespace UserDeleteCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
