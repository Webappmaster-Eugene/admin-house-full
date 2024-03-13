import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import { AxiosInterceptorProps } from "@/shared/api/lib/interceptor/AxiosInterceptor.props";
import { debounceRequests } from "@/shared/api/lib/interceptor/DebounceRequests";
import { HttpCodes } from "@/shared/api/const/ErrorsHttp";
import { PREFIX } from "@/shared/api/const/ApiUrl";

import { handleRefreshToken } from "./HandleRefreshToken";

export const axiosInterceptor = (props: AxiosInterceptorProps) => {
  const {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    removeAuthTokens,
    getIsRefreshSent,
    setIsRefreshSent,
  } = props;
  axios.defaults.baseURL = PREFIX;
  axios.defaults.headers["Content-Type"] = "application/json";

  axios.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) =>
      Promise.reject(
        `Произошла ошибка при использовании accessToken - ${error}, accessToken = ${getAccessToken()}`
      )
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === HttpCodes.Unauthorized) {
        const config: AxiosRequestConfig = error?.config;
        const oldRefreshToken = getRefreshToken();
        const isSentToRefresh = getIsRefreshSent();

        if (isSentToRefresh) {
          return debounceRequests<AxiosRequestConfig>(
            config,
            getIsRefreshSent,
            getAccessToken,
            200,
            5000
          );
        }
        setIsRefreshSent(true);

        try {
          const [accessToken, refreshToken] = await handleRefreshToken(oldRefreshToken);
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        } catch (error) {
          console.log(error);
          removeAuthTokens();
        } finally {
          setIsRefreshSent(false);
        }
      }
      throw new Error(error);
    }
  );
};
