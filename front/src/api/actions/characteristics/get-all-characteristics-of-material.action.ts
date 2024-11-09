'use server';

import { AxiosError } from 'axios';
import { CharacteristicsMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllCharacteristicsOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CharacteristicsMaterialGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.characteristics_material.get_all_in_material
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as CharacteristicsMaterialGetAllCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get all characteristics of material`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get all characteristics of material`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
};
