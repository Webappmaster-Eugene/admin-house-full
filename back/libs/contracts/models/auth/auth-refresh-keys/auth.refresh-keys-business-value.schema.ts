import { z } from 'zod';

export const AuthRefreshKeysBusinessValueSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
