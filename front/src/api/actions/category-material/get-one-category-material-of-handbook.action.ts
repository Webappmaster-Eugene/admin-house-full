'use server';

import { AxiosError } from 'axios';
import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getOneCategoryMaterialOfHandbook(
  workspaceId: string,
  handbookId: string,
  categoryId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CategoryMaterialGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.category_material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryId)
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response.data as CategoryMaterialGetCommand.ResponseEntity;
    }

    console.error('Standard backend error while get one category material of handbook', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error('Catched frontend error while get one category material of handbook', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
