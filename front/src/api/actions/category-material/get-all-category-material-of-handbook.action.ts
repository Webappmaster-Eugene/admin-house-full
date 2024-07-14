'use server';

import { AxiosError } from 'axios';
import { CategoryMaterialGetAllCommand } from '@/../../back/libs/contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllCategoryMaterialOfHandbook(workspaceId: string, handbookId: string) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.category_material.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    );
    if (isGoodHttpCode(response.statusCode)) {
      return response.data as CategoryMaterialGetAllCommand.ResponseEntity;
    }

    console.error('Standard backend error while get all category material of handbook', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error('Catched frontend error while get all category material of handbook', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
