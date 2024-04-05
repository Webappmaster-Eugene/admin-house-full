import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { EntityGetCommand } from '../common/get-param.command';

const UserDeleteResponseSchema = z.object({
  deletedUsers: z.array(UserSchema),
  count: z.number(),
});

export namespace UserDeleteCommand {
  export const RequestParamSchema = EntityGetCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
