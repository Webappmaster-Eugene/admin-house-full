import { z } from 'zod';

export const configSchema = z.object({
  APP_PORT: z
    .string()
    .default('3000')
    .transform((port) => parseInt(port, 10)),
  API_PREFIX: z.string().default('api'),
  JWT_KEY: z.string(),
  DATABASE_URL: z.string(),

  STRICT_ADMIN_KEY: z.string(),
  KEY_SECRET_FOR_STRICT_ADMIN_KEY: z.string(),
});

export type ConfigSchema = z.infer<typeof configSchema>;
