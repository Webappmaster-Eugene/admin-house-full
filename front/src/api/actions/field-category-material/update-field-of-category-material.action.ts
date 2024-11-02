'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { FieldOfCategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateFieldOfCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  updateFieldOfCategoryMaterialDto: FieldOfCategoryMaterialUpdateCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldOfCategoryMaterialUpdateCommand.Response = await axiosInstance.put(
      axiosEndpoints.field_category_material.update
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId),
      updateFieldOfCategoryMaterialDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      revalidatePath('/dashboard/fields/');
      return response.data as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;
    }

    console.error(
      `Standard backend error while update field of category material with id=${fieldOfCategoryMaterialId}`,
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
      `Catched frontend error while update field of category material with id=${fieldOfCategoryMaterialId}`,
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
