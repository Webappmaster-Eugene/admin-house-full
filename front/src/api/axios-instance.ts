import axios, {
  AxiosError,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

import { axiosEndpoints } from 'src/entities/auth/lib';
import { AUTH_PATHS } from 'src/entities/auth/lib/auth.paths';
import { logoutUser } from 'src/api/actions/auth/logout.action';
import { getAccessToken, getRefreshToken } from 'src/entities/auth/lib/auth.service';

type ResponseClientType = {
  statusCode: number;
  message: string;
  errors?: Array<{ name: string; description: string }> | null;
  data: unknown;
};

// Mutex для предотвращения параллельных вызовов refresh при одновременных 403
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token!)));
  failedQueue = [];
};

const axiosOptions: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_HOST_API,
  withCredentials: true,
  maxRedirects: 5,
};

const axiosAuthedInstance = axios.create(axiosOptions);

axiosAuthedInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig & { _retry?: boolean }) => {
    const clientCookieAccessToken = await getAccessToken();

    if (!config?._retry && config.headers && clientCookieAccessToken) {
      config.headers.Authorization = clientCookieAccessToken;
    }
    const refreshToken = await getRefreshToken();
    if (refreshToken) {
      config.headers.Cookie = `REFRESH_KEY=${refreshToken}`;
    }
    return config;
  }
);

axiosAuthedInstance.interceptors.response.use(
  (res) => {
    const responseData = res?.data;
    return responseData;
  },
  async (error) => {
    const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
    const errorPath = error.request?.path;
    const responseData: ResponseClientType = error.response?.data;
    const isAuthPath =
      errorPath === AUTH_PATHS.login ||
      errorPath === AUTH_PATHS.register ||
      errorPath === AUTH_PATHS.refresh_keys;

    if (
      responseData?.statusCode === 403 &&
      !isAuthPath &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.headers?.Authorization
    ) {
      if (isRefreshing) {
        // Ставим запрос в очередь — он будет повторён когда refresh завершится
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers!.Authorization = token;
          return axiosAuthedInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosAuthedInstance.post(axiosEndpoints.auth.refresh_keys);
        const newToken = `Bearer ${data?.accessToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = newToken;
        return await axiosAuthedInstance(originalRequest);
      } catch (errorRefresh: unknown) {
        processQueue(errorRefresh);
        if (responseData?.errors?.[0]?.description) {
          throw new AxiosError(responseData.errors[0].description);
        }
        throw new AxiosError(responseData?.message);
      } finally {
        isRefreshing = false;
      }
    }

    if (
      (responseData?.statusCode === 401 || responseData?.statusCode === 403) &&
      !isAuthPath
    ) {
      await logoutUser();
    }

    return responseData;
  }
);

export default axiosAuthedInstance;
