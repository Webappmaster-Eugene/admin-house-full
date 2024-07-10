import { z } from 'zod';
import { ResponseClientSchema } from '../../models';
import { AuthStrictKeyBusinessValueSchema } from '../../models';

const AuthGetKeyResponseEntitySchema = AuthStrictKeyBusinessValueSchema;

const AuthGetKeyResponseSchema = z
  .object({
    data: AuthGetKeyResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AuthGetKeyCommand {
  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthGetKeyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
