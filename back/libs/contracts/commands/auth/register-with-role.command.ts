import { z } from 'zod';

const AuthRegisterWithRoleRequestParamSchema = z.object({
  roleId: z.string(),
  registerWithRoleKey: z.string(),
});

const AuthRegisterWithRoleRequestSchema = z.object({
  firstName: z.string(),
  secondName: z.string().optional(),
  avatar: z.string().optional(),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      `Phone must be a valid phone number`,
    )
    .optional(),
  email: z.string().email(),
  password: z.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    `Password must have:
Minimum 8 characters in length;
At least one uppercase English letter;
At least one lowercase English letter;
At least one digit;
At least one special character`,
  ),
  address: z.string().optional(),
  info: z.string().optional(),
  documents: z.string().optional(),
});

const AuthRegisterWithRoleResponseSchema = z.object({
  uuid: z.string(),
  email: z.string().email(),
  accessToken: z.string(),
  roleId: z.number(),
});

export namespace AuthRegisterWithRoleCommand {
  export const RequestParamSchema = AuthRegisterWithRoleRequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestSchema = AuthRegisterWithRoleRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthRegisterWithRoleResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
