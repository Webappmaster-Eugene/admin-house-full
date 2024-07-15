import { z } from 'zod';
import { AuthStrictKeyBusinessValueSchema } from '../../../models/auth/auth-strict-key/auth.strict-key-business-value.schema';
import { ResponseClientSchema } from '../../../models';

const AuthGetKeyResponseEntitySchema = AuthStrictKeyBusinessValueSchema;

const AuthGetKeyResponseSchema = z
  .object({
    data: AuthGetKeyResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGetKeyCommand {
  export const BusinessValueSchema = AuthStrictKeyBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthGetKeyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
