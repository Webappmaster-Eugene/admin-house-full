'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { CategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteOneCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: CategoryMaterialDeleteCommand.RequestParam
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialDeleteCommand.Response = await axiosInstance.delete(
      axiosEndpoints.category_material.delete
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      return response.data as CategoryMaterialDeleteCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while delete category-material with id=${categoryMaterialId}`,
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
      `Catched frontend error while delete category-material with id=${categoryMaterialId}`,
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
