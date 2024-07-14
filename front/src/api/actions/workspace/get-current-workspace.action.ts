'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { WorkspaceGetCommand } from '@/../../back/libs/contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentWorkspace = cache(async (workspaceId: string) => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: WorkspaceGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.workspace.get.replace(':workspaceId', workspaceId)
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as WorkspaceGetCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get workspace with id ${workspaceId}`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get workspace with id ${workspaceId}`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
});
