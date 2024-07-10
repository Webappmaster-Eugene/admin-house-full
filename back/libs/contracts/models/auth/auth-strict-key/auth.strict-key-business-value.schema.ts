import { z } from 'zod';

export const AuthStrictKeyBusinessValueSchema = z.object({
  key: z.string(),
});
