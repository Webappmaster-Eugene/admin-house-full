import { z } from 'zod';

export const configSchema = z.object({
  APP_PORT: z
    .string()
    .default('3000')
    .transform(port => parseInt(port, 10)),
  API_PREFIX: z.string().default('api'),
  API_VERSION: z.string().default('1.0'),

  JWT_KEY: z.string(),
  DATABASE_URL: z.string(),

  STRICT_ADMIN_KEY: z.string(),
  KEY_SECRET_FOR_STRICT_ADMIN_KEY: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z
    .string()
    .default('6379')
    .transform(port => parseInt(port, 10)),
});

export type ConfigSchema = z.infer<typeof configSchema>;
