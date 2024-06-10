import { z } from 'zod';
import { EUserVariants } from '@numart/house-admin-contracts';

const allUseRoles = EUserVariants;

export type Role = z.infer<typeof allUseRoles>;

export const AccessTokenDataSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string(),
  roleUuid: z.string().uuid(),
  iat: z.number(),
  exp: z.number(),
});

export const RefreshTokenDataSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type AccessTokenData = z.infer<typeof AccessTokenDataSchema>;

export type RefreshTokenData = z.infer<typeof RefreshTokenDataSchema>;
