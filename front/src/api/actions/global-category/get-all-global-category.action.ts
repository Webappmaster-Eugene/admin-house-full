'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { GlobalCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllGlobalCategories = cache(async () => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: GlobalCategoryMaterialGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.global_category_material.get_all
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as GlobalCategoryMaterialGetAllCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get all global category`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get all global category`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
});
