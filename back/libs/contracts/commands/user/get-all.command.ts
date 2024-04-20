import { unknown, z } from 'zod';
import { UserSchema } from '../../models/user';
import { ResponseClientSchema } from '../../models/response-client';

const UserGetAllResponseSchema = z
  .object({
    data: z.array(
      UserSchema.omit({
        password: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
  })
  .merge(ResponseClientSchema);

export namespace UserGetAllCommand {
  export const ResponseSchema = UserGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
