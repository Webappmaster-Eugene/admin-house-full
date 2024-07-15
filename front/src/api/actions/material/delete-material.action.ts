'use server';

import { AxiosError } from 'axios';
import { MaterialDeleteCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: MaterialDeleteCommand.Response = await axiosInstance.delete(
      axiosEndpoints.material.delete
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
    );

    if (isGoodHttpCode(response.statusCode)) {
      return response.data as MaterialDeleteCommand.ResponseEntity;
    }

    console.error(`Standard backend error while delete material with id=${materialId}`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while delete material with id=${materialId}`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
