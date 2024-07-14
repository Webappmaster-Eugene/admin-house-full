import { z } from 'zod';

export const PasswordSchema = z.object({
  password: z.string(),
});
