import { z } from 'zod';

export const AuthStrictKeySchema = z.object({
  key: z.string(),
});
