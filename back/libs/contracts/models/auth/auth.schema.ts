import { z } from 'zod';

export const AuthSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  roleName: z.enum(['ADMIN', 'MANAGER', 'WORKER', 'CUSTOMER']),
  accessToken: z.string(),
});
