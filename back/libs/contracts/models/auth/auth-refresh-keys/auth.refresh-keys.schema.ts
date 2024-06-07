import { z } from 'zod';

export const AuthRefreshKeysSchema = z.object({
  accessKey: z.string(),
  refreshKey: z.string(),
});
