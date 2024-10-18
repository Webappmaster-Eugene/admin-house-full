'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { CategoryMaterialCreateCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  createCategoryMaterialDto: CategoryMaterialCreateCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialCreateCommand.Response = await axiosInstance.post(
      axiosEndpoints.category_material.create
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId),
      createCategoryMaterialDto
    );

    if (isGoodHttpCode(response.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      return response.data as CategoryMaterialCreateCommand.ResponseEntity;
    }

    console.error(`Standard backend error while create a new category-material`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while create a new category-material`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
