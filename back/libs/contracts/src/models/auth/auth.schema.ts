import { z } from 'zod';

export const AuthSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
  documents: z.string().nullable().optional(),
  roleUuid: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
