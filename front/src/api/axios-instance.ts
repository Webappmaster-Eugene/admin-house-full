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
import { logoutUser } from 'src/api/actions/auth-actions/logout.action';

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
    // if (res.da._retry === true) {
    //   console.log('logout');
    //   await logoutUser();
    // }

    const responseData = res.data;
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

    if (responseData.statusCode) {
      await logoutUser();
    }

    console.error('Ошибка от сервера: ', responseData);
    return responseData;
  }
);

export default axiosAuthedInstance;