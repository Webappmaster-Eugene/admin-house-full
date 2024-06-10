import { create } from 'zustand';
import { cookies } from 'next/headers';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { TokenType, AuthLoginCommand } from '@numart/house-admin-contracts';

import { getLocalStorage } from 'src/shared/hooks';
import axiosInstance from 'src/shared/utils/auth/axios';
import { cookieKeys } from 'src/shared/utils/const/keys.cookie';
import { axiosEndpoints } from 'src/shared/utils/auth/endpoints';
import { localStorageKeys } from 'src/shared/utils/const/keys.localstorage';
import { decodeAccessToken, decodeRefreshToken } from 'src/shared/utils/auth/decode.tokens';

import { AccessTokenData } from '../lib/auth-store.lib';

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: AccessTokenData | undefined;
  refreshToken: string | undefined;
  refreshTokenData: AccessTokenData | undefined;

  // actions
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  setAccessToken: (accessToken: string) => string;
  setRefreshToken: (refreshToken: string) => string;
  init: () => void; // set tokens on the app start
  clearTokens: () => void;
};

export const getServerSideProps = async () => {
  // // Fetch data from external API
  // const res = await fetch('https://api.github.com/repos/vercel/next.js');
  // const repo: Repo = await res.json();
  // // Pass data to the page via props
  // return { props: { repo } };
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
        login: async (email: string, password: string): Promise<void> => {
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
            return undefined;
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

        setAccessToken: (accessToken: string): string => {
          try {
            localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
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
