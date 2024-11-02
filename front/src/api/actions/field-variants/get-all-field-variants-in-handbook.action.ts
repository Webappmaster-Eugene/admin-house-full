'use server';

import { AxiosError } from 'axios';
import { FieldVariantsForSelectorFieldTypeGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllFieldVariantsInHandbook(workspaceId: string, handbookId: string) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldVariantsForSelectorFieldTypeGetAllCommand.Response =
      await axiosInstance.get(
        axiosEndpoints.field_variants.get_all_in_handbook
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
      );
    if (isGoodHttpCode(response?.statusCode)) {
      return response.data as FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;
    }

    console.error('Standard backend error while get all field-variants in handbook', response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error('Catched frontend error while get all field-variants in handbook', error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
