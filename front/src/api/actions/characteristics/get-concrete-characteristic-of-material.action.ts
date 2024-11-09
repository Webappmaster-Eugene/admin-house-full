'use server';

import { AxiosError } from 'axios';
import { CharacteristicsMaterialGetCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCharacteristicOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  characteristicsMaterialId: string
) => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CharacteristicsMaterialGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.characteristics_material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
        .replace(':characteristicsMaterialId', characteristicsMaterialId)
    );
    if (isGoodHttpCode(response?.statusCode)) {
      return response?.data as CharacteristicsMaterialGetCommand.ResponseEntity;
    }

    console.error(`Standard backend error while get concrete characteristic of material`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while get concrete characteristic of material`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
};
