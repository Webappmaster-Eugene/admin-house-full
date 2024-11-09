'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { MaterialGetCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getConcreteMaterialInHandbook(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: MaterialGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath(`/dashboard/category-materials/${categoryMaterialId}/`);
      revalidatePath('/dashboard/materials/');
      return response.data as MaterialGetCommand.ResponseEntity;
    }

    console.error(
      'Standard backend error while get concrete material in handbook by user',
      response
    );
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error('Catched frontend error while get concrete material in handbook by user', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
