import { z } from 'zod';
import { UserSchema } from '../../models/user';

const UserGetAllResponseSchema = z.object({
  data: z.array(UserSchema),
  count: z.number().nonnegative(),
});

export namespace UserGetAllCommand {
  export const ResponseSchema = UserGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
