import { unknown, z } from 'zod';
import { TypeFieldSchema, RoleSchema, StrictKeySchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const AuthGenerateKeyRequestSchema = z.object({
  key: z.string(),
});

const AuthGenerateKeyResponseSchema = z
  .object({
    data: StrictKeySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthGenerateKeyCommand {
  export const RequestSchema = AuthGenerateKeyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthGenerateKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
