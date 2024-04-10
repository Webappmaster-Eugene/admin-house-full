import { z } from 'zod';

const AuthLoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AuthLoginResponseSchema = z.object({
  email: z.string().email(),
  accessToken: z.string(),
});

export namespace AuthLoginCommand {
  export const RequestSchema = AuthLoginRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthLoginResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
