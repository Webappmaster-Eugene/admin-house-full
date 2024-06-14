import { jwtDecode } from 'jwt-decode';

import {
  AccessTokenData,
  RefreshTokenData,
  AccessTokenDataSchema,
} from 'src/auth/lib/auth-store.lib';

export const decodeAccessToken = (accessToken: string) =>
  AccessTokenDataSchema.parse(jwtDecode<AccessTokenData>(accessToken));

export const decodeRefreshToken = (refreshToken: string) =>
  AccessTokenDataSchema.parse(jwtDecode<RefreshTokenData>(refreshToken));
