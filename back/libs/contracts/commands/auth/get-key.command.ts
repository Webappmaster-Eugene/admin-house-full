import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AuthStrictKeySchema } from '../../models';

const AuthGetKeyResponseSchema = z
  .object({
    data: AuthStrictKeySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGetKeyCommand {
  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
