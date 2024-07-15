'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { HandbookGetCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentHandbook = cache(async (workspaceId: string, handbookId: string) => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: HandbookGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.handbook.get
        .replace(':handbookId', handbookId)
        .replace(':workspaceId', workspaceId)
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as HandbookGetCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get handbook with id ${handbookId}`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get handbook with id ${handbookId}`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
});
