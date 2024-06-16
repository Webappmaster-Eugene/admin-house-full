'use server';

import { AxiosError } from 'axios';
import { AppInfoGetCommand } from '@numart/house-admin-contracts';

import { axiosEndpoints } from 'src/utils/auth';
import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';

export async function getAppInfo() {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: AppInfoGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.app_info.get
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as AppInfoGetCommand.ResponseEntity;
    }

    console.error('Standard backend error while get app-info at start of the app', response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    return { errorObject: response?.message };
  } catch (error: unknown) {
    console.error('Catched frontend error while get app-info at start of the app', error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
