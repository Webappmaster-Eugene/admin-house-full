'use server';

import { AxiosError } from 'axios';
import { FieldOfCategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteFieldOfCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldOfCategoryMaterialDeleteCommand.Response = await axiosInstance.delete(
      axiosEndpoints.field_category_material.delete
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId)
    );

    if (isGoodHttpCode(response?.statusCode)) {
      return response.data as FieldOfCategoryMaterialDeleteCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while delete field of category material with id=${fieldOfCategoryMaterialId}`,
      response
    );
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(
      `Catched frontend error while delete field of category material with id=${fieldOfCategoryMaterialId}`,
      error
    );
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
