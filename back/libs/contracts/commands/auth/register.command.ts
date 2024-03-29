import { z } from 'zod';

const UserRegisterRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      `Phone must be a valid phone number`,
    )
    .optional(),
  password: z.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    `Password must have:
Minimum 8 characters in length;
At least one uppercase English letter;
At least one lowercase English letter;
At least one digit;
At least one special character`,
  ),
  productKey: z.string().optional(),
});

const UserRegisterResponseSchema = z.object({
  email: z.string().email(),
  accessToken: z.string(),
  roleId: z.number(),
});

export namespace UserRegisterCommand {
  export const RequestSchema = UserRegisterRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = UserRegisterResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
