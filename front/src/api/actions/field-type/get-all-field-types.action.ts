'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { FieldTypeGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllFieldTypes = cache(async () => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldTypeGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.field_type.get_all
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as FieldTypeGetAllCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get all field types`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get all field types`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
});
