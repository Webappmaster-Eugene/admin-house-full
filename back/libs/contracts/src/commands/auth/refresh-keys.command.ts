import { z } from 'zod';
import { AuthRefreshKeysBusinessValueSchema } from '../../models/auth/auth-refresh-keys/auth.refresh-keys-business-value.schema';
import { ResponseClientSchema } from '../../models';

const AuthRefreshKeysResponseEntitySchema = AuthRefreshKeysBusinessValueSchema;

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
