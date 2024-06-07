import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/shared/config-global';
import { localStorageKeys } from 'src/shared/utils/keys.localstorage';

const axiosInstance = axios.create({ baseURL: HOST_API, withCredentials: true });

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  config.headers.authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
