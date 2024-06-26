'use server';

import { cookies } from 'next/headers';

import { cookieKeys } from 'src/utils/const';

export const getAccessToken = async () => {
  const accessToken = cookies().get(cookieKeys.USED_ACCESS_KEY)?.value;
  return accessToken || null;
};

export const getRefreshToken = async () => {
  const refreshToken = cookies().get(cookieKeys.REFRESH_KEY)?.value;
  return refreshToken || null;
};

export const saveTokenStorage = (accessToken: string) => {
  cookies().set(cookieKeys.USED_ACCESS_KEY, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1,
  });
};

export const removeAccessTokenCookie = () => {
  cookies().delete(cookieKeys.USED_ACCESS_KEY);
};
