import { z } from 'zod';
import { AuthRefreshKeysSchema, ResponseClientSchema } from '../../models';

const AuthRefreshKeysResponseSchema = z
  .object({
    data: AuthRefreshKeysSchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthRefreshKeysCommand {
  export const ResponseSchema = AuthRefreshKeysResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
