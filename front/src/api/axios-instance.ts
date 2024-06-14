import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

import { axiosEndpoints } from 'src/utils/auth';
import { AUTH_PATHS } from 'src/utils/auth/auth.paths';
import { getAccessToken, getRefreshToken } from 'src/utils/auth/auth.service';

import { HOST_API } from 'src/config-global';

type ResponseClientType = {
  statusCode: number;
  message: string;
  errors?: Array<{ name: string; description: string }> | null;
  data: unknown;
};

const axiosOptions: CreateAxiosDefaults = {
  baseURL: HOST_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 5,
};

const axiosAuthedInstance = axios.create(axiosOptions);

axiosAuthedInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
    const clientCookieAccessToken = await getAccessToken();

    if (!config?._retry) {
      if (config.headers && clientCookieAccessToken) {
        config.headers.Authorization = clientCookieAccessToken;
      } else {
        config.headers.Authorization = `Bearer bad_access_token`;
      }
    }

    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      config.headers.Cookie = `REFRESH_KEY=${refreshToken}`;
    }
    return config;
  }
);

axiosAuthedInstance.interceptors.response.use(
  async (res) => {
    const responseData = res.data;

    // const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = res.config;
    // if (res.data.statusCode === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   try {
    //     const { data } = await axiosAuthedInstance.post(axiosEndpoints.auth.refresh_keys);
    //     axiosAuthedInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    //     return await axiosAuthedInstance(originalRequest);
    //   } catch (errorRefresh: unknown) {
    //     if (errorCatch(errorRefresh) === 'jwt expired') {
    //       removeAccessTokenCookie();
    //     }
    //     if (responseData?.errors[0]?.description) {
    //       throw new AxiosError(responseData?.errors[0]?.description);
    //     } else {
    //       throw new AxiosError(responseData?.errors[0]);
    //     }
    //   }
    // }
    return responseData;
  },
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    const errorPath = error.request?.path;
    const responseData: ResponseClientType = error.response?.data;
    if (
      responseData?.statusCode === 403 &&
      errorPath !== AUTH_PATHS.login &&
      errorPath !== AUTH_PATHS.register &&
      errorPath !== AUTH_PATHS.refresh_keys &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.headers?.Authorization
    ) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosAuthedInstance.post(axiosEndpoints.auth.refresh_keys);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        const responseRetry = await axiosAuthedInstance(originalRequest);
        return responseRetry;
      } catch (errorRefresh: unknown) {
        if (responseData?.errors && responseData?.errors[0]?.description) {
          throw new AxiosError(responseData?.errors[0]?.description);
        } else {
          throw new AxiosError(responseData?.message);
        }
      }
    }
    console.error('Ошибка от сервера: ', responseData);
    return responseData;
  }
);

export default axiosAuthedInstance;
