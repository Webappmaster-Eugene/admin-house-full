import { z } from 'zod';

const AuthGetKeyResponseSchema = z.object({
  key: z.string(),
});

export namespace AuthGetKeyCommand {
  export const ResponseSchema = AuthGetKeyResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
