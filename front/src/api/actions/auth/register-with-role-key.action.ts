'use server';

import { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { AuthRegisterCommand, AuthRegisterWithRoleCommand } from '@numart/house-admin-contracts';

import { cookieKeys } from 'src/utils/const';
import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function registerWithRoleKey(data: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  secondName: string;
  roleId: number;
  secretKey: string;
}) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: AuthRegisterWithRoleCommand.Response = await axiosInstance.post(
      axiosEndpoints.auth.register_with_role_key
        .replace(':roleId', data.roleId.toString())
        .replace(':secretKey', data.secretKey),
      data
    );

    if (isGoodHttpCode(response?.statusCode)) {
      cookies().set(cookieKeys.USED_ACCESS_KEY, `Bearer ${response?.data?.accessToken}`, {
        maxAge: 604800,
      });
      cookies().set(cookieKeys.REFRESH_KEY, `${response?.data?.refreshToken}`, {
        maxAge: 604800,
      });
      return response?.data as AuthRegisterCommand.ResponseEntity;
    }

    console.error('Standard backend error while register', response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    console.error('Not standard backend error while register', response);
    errorObject.error = response?.message;
    return errorObject;
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
