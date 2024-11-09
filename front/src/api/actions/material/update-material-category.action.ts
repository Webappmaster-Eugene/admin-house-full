'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { MaterialUpdateCategoryCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateMaterialCategory(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  updateCategoryOfMaterialDto: MaterialUpdateCategoryCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: MaterialUpdateCategoryCommand.Response = await axiosInstance.put(
      axiosEndpoints.material.change_category
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId),
      updateCategoryOfMaterialDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath(`/dashboard/category-materials/${categoryMaterialId}/`);
      revalidatePath('/dashboard/materials/');
      return response.data as MaterialUpdateCategoryCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while update only category of material with id=${materialId}`,
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
      `Catched frontend error while update only category of material with id=${materialId}`,
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
