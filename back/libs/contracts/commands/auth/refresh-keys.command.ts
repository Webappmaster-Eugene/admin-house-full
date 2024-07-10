import { z } from 'zod';
import { AuthRefreshKeysBusinessValueSchema, ResponseClientSchema } from '../../models';

const AuthRefreshKeysResponseEntitySchema = AuthRefreshKeysBusinessValueSchema;

const AuthRefreshKeysResponseSchema = z
  .object({
    data: AuthRefreshKeysResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AuthRefreshKeysCommand {
  export const ResponseSchema = AuthRefreshKeysResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthRefreshKeysResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
