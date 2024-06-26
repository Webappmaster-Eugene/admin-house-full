'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentUser = cache(async () => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: UserGetFullInfoCommand.Response = await axiosInstance.get(
      axiosEndpoints.users.me
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as UserGetFullInfoCommand.ResponseEntity;
    }

    console.error('Standard backend error while get current user', response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    return { errorObject: response?.message };
  } catch (error: unknown) {
    console.error('Catched frontend error while get current user', error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
});
