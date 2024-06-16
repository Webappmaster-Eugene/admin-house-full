'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { AuthRegisterCommand } from '@numart/house-admin-contracts';

import { cookieKeys } from 'src/utils/const';
import { axiosEndpoints } from 'src/utils/auth';
import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';

export async function register(data: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  secondName: string;
}) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: AuthRegisterCommand.Response = await axiosInstance.post(
      axiosEndpoints.auth.register,
      data
    );
    if (isGoodHttpCode(response?.statusCode)) {
      cookies().set(cookieKeys.USED_ACCESS_KEY, `Bearer ${response?.data?.accessToken}`, {
        maxAge: 40,
        // expires: new Date(Date.now() + 40),
        // path: '/',
      });
      cookies().set(cookieKeys.REFRESH_KEY, `${response?.data?.refreshToken}`, {
        maxAge: 604800,
        // expires: new Date(Date.now() + 604800),
        // httpOnly: true,
        // path: '/',
      });
      return response?.data as AuthRegisterCommand.ResponseEntity;
    }

    console.error('Standard backend error while register', response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    console.error('Not standard backend error while register', response);
    return { errorObject: response.message };
  } catch (error: unknown) {
    console.error('Catched frontend error while register', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
