import { z } from 'zod';

export const StrictKeySchema = z.object({
  key: z.string(),
});
