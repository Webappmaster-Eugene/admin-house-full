'use server';

import { AxiosError } from 'axios';
import { MaterialGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllMaterials() {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: MaterialGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.users.get_all
    );
    if (isGoodHttpCode(response.statusCode)) {
      return response.data as MaterialGetAllCommand.ResponseEntity;
    }

    console.error('Standard backend error while get all materials by user', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    return { errorObject: response.message };
  } catch (error: unknown) {
    console.error('Catched frontend error while get all materials by user', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
