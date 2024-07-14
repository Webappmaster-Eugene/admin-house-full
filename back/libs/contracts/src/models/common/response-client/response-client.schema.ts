import { unknown, z } from 'zod';

export const ResponseClientStrictSchema = z
  .object({
    statusCode: z.number(),
    message: z.string(),
  })
  .strict();

export const ResponseClientSchema = z
  .object({
    errors: z.array(unknown()).nullable().optional(),
  })
  .merge(ResponseClientStrictSchema);
