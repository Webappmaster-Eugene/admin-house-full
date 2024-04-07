import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserGetResponseSchema = UserSchema;

export namespace UserGetCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
