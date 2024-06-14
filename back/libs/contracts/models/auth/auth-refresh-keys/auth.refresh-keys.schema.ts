import { z } from 'zod';

export const AuthRefreshKeysSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
