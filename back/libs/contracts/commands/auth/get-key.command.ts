import { z } from 'zod';
import { ResponseClientSchema } from '../../models/response-client';
import { StrictKeySchema } from '../../models';

const AuthGetKeyResponseSchema = z
  .object({
    data: StrictKeySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGetKeyCommand {
  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
