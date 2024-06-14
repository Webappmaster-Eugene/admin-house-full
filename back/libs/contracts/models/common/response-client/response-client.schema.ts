import { unknown, z } from 'zod';

export const ResponseClientSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  errors: z.array(unknown()).optional().nullable(),
});
