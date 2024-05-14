import { z } from 'zod';
import { UserSchema } from '../../models';
import { ResponseClientSchema } from '../../models';
import { RequestGetAllQuerySchema } from '../../models';

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
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = UserGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
