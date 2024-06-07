import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { TokenType, AuthLoginCommand } from '@numart/house-admin-contracts';

import { getLocalStorage } from 'src/shared/hooks';
import axiosInstance from 'src/shared/utils/auth/axios';
import { axiosEndpoints } from 'src/shared/utils/auth/endpoints';
import { localStorageKeys } from 'src/shared/utils/keys.localstorage';
import { decodeAccessToken, decodeRefreshToken } from 'src/widgets/auth/lib/decode.tokens';

import { AccessTokenData } from '../lib/auth-store.lib';

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: AccessTokenData | undefined;
  refreshToken: string | undefined;
  refreshTokenData: AccessTokenData | undefined;

  // actions
  login: (email: string, password: string) => Promise<AuthStore>;
  register: (email: string, password: string) => void;
  setAccessToken: (accessToken: string | undefined) => string;
  setRefreshToken: (refreshToken: string | undefined) => string;
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
        login: async (email: string, password: string): Promise<AuthStore> => {
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
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, responseBody.accessToken);
            setAccessToken(responseBody.accessToken);
            setRefreshToken(responseBody.refreshToken);
            return get();
          } catch (error) {
            console.error(error);
            return error;
          }
        },

        register: (email: string, password: string) => {
          const { setAccessToken, setRefreshToken } = get();
        },
        // try {
        //   return accessToken ? decodeAccessToken(accessToken) : undefined;
        // } catch (error) {
        //   console.error(error);
        //   return undefined;
        // }

        setAccessToken: (accessToken: string | undefined) => {
          try {
            const accessTokenDataDecoded = accessToken ? decodeAccessToken(accessToken) : undefined;
            console.log(accessTokenDataDecoded);
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
            console.log(refreshTokenDataDecoded);
            set({
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
          setRefreshToken(getLocalStorage(TokenType.REFRESH));
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
