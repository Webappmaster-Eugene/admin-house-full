import { z } from 'zod';
import { AuthRefreshKeysSchema, AuthStrictKeySchema, ResponseClientSchema } from '../../models';

const AuthRefreshKeysResponseEntitySchema = AuthRefreshKeysSchema;

const AuthRefreshKeysResponseSchema = z
  .object({
    data: AuthRefreshKeysResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRefreshKeysCommand {
  export const ResponseSchema = AuthRefreshKeysResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRefreshKeysResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
