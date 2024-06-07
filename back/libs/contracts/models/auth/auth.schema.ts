import { z } from 'zod';
import { EUserVariants } from '../../enums';

export const AuthSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  roleName: EUserVariants,
  accessToken: z.string(),
  refreshToken: z.string(),
});
