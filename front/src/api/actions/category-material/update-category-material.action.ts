'use server';

import { AxiosError } from 'axios';
import { CategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  updateCategoryMaterialDto: CategoryMaterialUpdateCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialUpdateCommand.Response = await axiosInstance.put(
      axiosEndpoints.category_material.update
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId),
      updateCategoryMaterialDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      return response.data as CategoryMaterialUpdateCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while update category-material with id=${categoryMaterialId}`,
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
      `Catched frontend error while update category-material with id=${categoryMaterialId}`,
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
