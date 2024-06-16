'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { AuthLoginCommand } from '@numart/house-admin-contracts';

import { cookieKeys } from 'src/utils/const';
import { axiosEndpoints } from 'src/utils/auth';
import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';

export async function login(data: { email: string; password: string }) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: AuthLoginCommand.Response = await axiosInstance.post(
      axiosEndpoints.auth.login,
      data
    );
    if (isGoodHttpCode(response.statusCode)) {
      cookies().set(cookieKeys.USED_ACCESS_KEY, `Bearer ${response.data.accessToken}`, {
        maxAge: 40,
        // expires: new Date(Date.now() + 40),
        // path: '/',
      });
      cookies().set(cookieKeys.REFRESH_KEY, `${response.data.refreshToken}`, {
        maxAge: 604800,
        // expires: new Date(Date.now() + 604800),
        httpOnly: true,
        // path: '/',
      });
      return response.data as AuthLoginCommand.ResponseEntity;
    }

    console.error('Standard backend error while login', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    return { errorObject: response.message };
  } catch (error: unknown) {
    console.error('Catched frontend error while login', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
