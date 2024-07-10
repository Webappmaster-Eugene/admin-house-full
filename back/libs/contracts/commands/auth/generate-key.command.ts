import { z } from 'zod';
import { AuthStrictKeyBusinessValueSchema, CategoryMaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const AuthGenerateKeyResponseEntitySchema = AuthStrictKeyBusinessValueSchema;

const AuthGenerateKeyRequestSchema = z.object({
  key: z.string(),
});

const AuthGenerateKeyResponseSchema = z
  .object({
    data: AuthGenerateKeyResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace AuthGenerateKeyCommand {
  export const RequestSchema = AuthGenerateKeyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthGenerateKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthGenerateKeyResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
