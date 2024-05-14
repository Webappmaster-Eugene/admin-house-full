import { z } from 'zod';
import { AuthStrictKeySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthGenerateKeyRequestSchema = z.object({
  key: z.string(),
});

const AuthGenerateKeyResponseSchema = z
  .object({
    data: AuthStrictKeySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGenerateKeyCommand {
  export const RequestSchema = AuthGenerateKeyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthGenerateKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
