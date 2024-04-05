import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { EntityGetCommand } from '../common/get-param.command';

const UserGetResponseSchema = UserSchema;

export namespace UserGetCommand {
  export const RequestParamSchema = EntityGetCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
