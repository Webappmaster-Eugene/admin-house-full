'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { CategoryMaterialDeleteManyCommand } from '@numart/house-admin-contracts/src/commands/category-material/delete-many.command';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteManyCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  deleteManyCategoryMaterialDto: CategoryMaterialDeleteManyCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialDeleteManyCommand.Response = await axiosInstance.post(
      axiosEndpoints.category_material.delete_many
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId),
      deleteManyCategoryMaterialDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      return response.data as CategoryMaterialDeleteManyCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while delete many category-materials with ids=${JSON.stringify(deleteManyCategoryMaterialDto)}`,
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
      `Catched frontend error while delete many category-materials with ids=${JSON.stringify(deleteManyCategoryMaterialDto)}`,
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