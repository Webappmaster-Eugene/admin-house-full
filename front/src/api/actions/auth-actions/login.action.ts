'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { AuthLoginCommand } from '@numart/house-admin-contracts';

import { cookieKeys } from 'src/utils/const';
import { axiosEndpoints } from 'src/utils/auth';
import { STATUS_CODES } from 'src/utils/const/status-codes';

import axiosInstance from 'src/api/axios-instance';

export async function login(data: { email: string; password: string }) {
  try {
    const response: AuthLoginCommand.Response = await axiosInstance.post(
      axiosEndpoints.auth.login,
      data
    );
    if (response.statusCode === STATUS_CODES.OK) {
      cookies().set(cookieKeys.USED_ACCESS_KEY, `Bearer ${response.data.accessToken}`, {
        maxAge: 40,
        // expires: new Date(Date.now() + 40),
        // path: '/',
      });
      cookies().set(cookieKeys.REFRESH_KEY, `${response.data.refreshToken}`, {
        maxAge: 604800,
        // expires: new Date(Date.now() + 604800),
        // httpOnly: true,
        // path: '/',
      });
      return response.data as AuthLoginCommand.ResponseEntity;
    }
    console.error(response.data);
    if (response?.errors) {
      return response.errors[0];
    }
    return response.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      return error.message;
    }
    console.error(error);
    return JSON.stringify(error);
  }
}
