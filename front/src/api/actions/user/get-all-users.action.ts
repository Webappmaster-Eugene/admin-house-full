'use server';

import { AxiosError } from 'axios';
import { UserGetAllCommand } from '@/../../back/libs/contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllUsers() {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: UserGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.users.get_all
    );
    console.log(response.data);

    if (response.statusCode && isGoodHttpCode(response.statusCode)) {
      return response.data as UserGetAllCommand.ResponseEntity;
    }

    console.error('Standard backend error while get all users by admin', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error('Catched frontend error while get all users by admin', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
