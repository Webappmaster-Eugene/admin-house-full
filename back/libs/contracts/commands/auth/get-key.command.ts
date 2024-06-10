import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AuthStrictKeySchema } from '../../models';

const AuthGetKeyResponseEntitySchema = AuthStrictKeySchema;

const AuthGetKeyResponseSchema = z
  .object({
    data: AuthGetKeyResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGetKeyCommand {
  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthGetKeyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
