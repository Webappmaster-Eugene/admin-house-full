import { z } from 'zod';

const AuthGenerateKeyRequestSchema = z.object({
  key: z.string(),
});

const AuthGenerateKeyResponseSchema = z.object({
  key: z.string(),
});

export namespace AuthGenerateKeyCommand {
  export const RequestSchema = AuthGenerateKeyRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthGenerateKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
