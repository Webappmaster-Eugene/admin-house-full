'use server';

import { AxiosError } from 'axios';
import { MaterialCreateCommand } from '@/../../back/libs/contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  createDto: MaterialCreateCommand.RequestSchema
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: MaterialCreateCommand.Response = await axiosInstance.post(
      axiosEndpoints.material.create
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId),
      createDto
    );

    if (isGoodHttpCode(response.statusCode)) {
      return response.data as MaterialCreateCommand.ResponseEntity;
    }

    console.error(`Standard backend error while create new material`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while create new material`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
