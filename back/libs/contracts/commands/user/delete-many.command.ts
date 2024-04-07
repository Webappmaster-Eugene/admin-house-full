import { z } from 'zod';
import { UserSchema } from '../../models/user';
import { ArrayIdRequestCommand } from '../common/array-delete-many.command';

const UserDeleteManyResponseSchema = z.object({
  deletedUsers: z.array(UserSchema),
  count: z.number(),
});

export namespace UserDeleteManyCommand {
  export const RequestParamSchema = ArrayIdRequestCommand.RequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = UserDeleteManyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
