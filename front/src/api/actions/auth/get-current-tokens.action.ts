'use server';

import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { IJWTPayload } from '@/../../back/libs/contracts';

import { cookieKeys } from 'src/utils/const';
import { IAccessTokenInfo } from 'src/utils/types/access-token.interface';

export async function getCurrentTokens(): Promise<IAccessTokenInfo | null | unknown> {
  try {
    const accessToken = cookies().get(cookieKeys.USED_ACCESS_KEY)?.value;
    if (!accessToken) {
      return null;
    }
    const accessTokenInfo: IJWTPayload = jwtDecode(accessToken);
    return { accessToken, accessTokenInfo };
  } catch (error: unknown) {
    console.log(error);
    return error;
  }
}
