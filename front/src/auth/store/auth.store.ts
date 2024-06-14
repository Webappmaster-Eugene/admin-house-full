import { create } from 'zustand';
import { cookies } from 'next/headers';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { TokenType, AuthLoginCommand } from '@numart/house-admin-contracts';

import { getLocalStorage } from 'src/hooks/get-local-storage';

import { cookieKeys, localStorageKeys } from 'src/utils/const';
import { axiosEndpoints, decodeAccessToken, decodeRefreshToken } from 'src/utils/auth';

import axiosInstance from 'src/api/axios-instance';
import { AccessTokenData } from 'src/auth/lib/auth-store.lib';

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: AccessTokenData | undefined;
  refreshToken: string | undefined;
  refreshTokenData: AccessTokenData | undefined;

  // actions
  login: (email: string, password: string) => any;
  register: (email: string, password: string) => any;
  setAccessToken: (accessToken: string) => string;
  setRefreshToken: (refreshToken: string) => string;
  init: () => void; // set tokens on the app start
  clearTokens: () => void;
};

export const authStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: undefined,
        accessTokenData: undefined,
        refreshToken: undefined,
        refreshTokenData: undefined,

        // actions
        login: async (email: string, password: string): Promise<any> => {
          'use server';

          try {
            const { setAccessToken, setRefreshToken } = get();

            const response: AuthLoginCommand.Response = await axiosInstance.post(
              axiosEndpoints.auth.login,
              {
                email,
                password,
              }
            );
            const responseBody = response.data;

            const cookieStore = cookies();
            const refreshToken = cookieStore.get(cookieKeys.REFRESH_KEY);

            setAccessToken(responseBody.accessToken);
            setRefreshToken(responseBody.refreshToken);
            console.error(refreshToken, responseBody.refreshToken);
            return responseBody;
          } catch (error) {
            console.error(error);
            return error;
          }
        },

        register: async (email: string, password: string): Promise<any> => {
          'use server';

          const { setAccessToken, setRefreshToken } = get();
          const response: AuthLoginCommand.Response = await axiosInstance.post(
            axiosEndpoints.auth.login,
            {
              email,
              password,
            }
          );

          const responseBody = response.data;
          const cookieStore = cookies();
          const refreshToken = cookieStore.get(cookieKeys.REFRESH_KEY);

          setAccessToken(responseBody.accessToken);
          setRefreshToken(responseBody.refreshToken);
          console.error(refreshToken, responseBody.refreshToken);
          return responseBody;
        },

        setAccessToken: (accessToken: string): string => {
          try {
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
            const accessTokenDataDecoded = accessToken ? decodeAccessToken(accessToken) : undefined;
            set({
              accessTokenData: accessTokenDataDecoded,
            });
            return accessToken;
          } catch (error) {
            console.error(error);
            return error;
          }
        },

        setRefreshToken: (refreshToken: string | undefined) => {
          try {
            const refreshTokenDataDecoded = refreshToken
              ? decodeRefreshToken(refreshToken)
              : undefined;
            set({
              refreshToken,
              refreshTokenData: refreshTokenDataDecoded,
            });
            return refreshToken;
          } catch (error) {
            console.error(error);
            return error;
          }
        },

        init: () => {
          const { setAccessToken, setRefreshToken } = get();
          setAccessToken(getLocalStorage(TokenType.ACCESS));
          // setRefreshToken(cookies(TokenType.REFRESH));
        },

        clearTokens: () =>
          set({
            accessToken: undefined,
            accessTokenData: undefined,
            refreshToken: undefined,
            refreshTokenData: undefined,
          }),
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'auth-store',
      enabled: process.env.NEXT_FRONT_MODE === 'development',
    }
  )
);
