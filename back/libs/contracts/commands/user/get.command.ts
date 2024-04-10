import { z } from 'zod';
import { UserSchema } from '../../models';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';

const UserGetResponseSchema = UserSchema.omit({
  password: true,
});

export namespace UserGetCommand {
  export const RequestParamSchema =
    EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
