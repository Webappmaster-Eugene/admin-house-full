import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserDeleteResponseSchema = UserSchema.pick({ uuid: true });

export namespace UserDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
