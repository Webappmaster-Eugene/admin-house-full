'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import {
  CharacteristicsMaterialGetCommand,
  CharacteristicsMaterialCreateCommand,
} from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const createCharacteristicOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  fieldCategoryMaterialId: string,
  createCharacteristicMaterialDto: CharacteristicsMaterialCreateCommand.Request
) => {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: CharacteristicsMaterialGetCommand.Response = await axiosInstance.post(
      axiosEndpoints.characteristics_material.create
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
        .replace(':fieldCategoryMaterialId', fieldCategoryMaterialId),
      createCharacteristicMaterialDto
    );
    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath(`/dashboard/category-materials/${categoryMaterialId}/`);
      revalidatePath('/dashboard/materials/');
      return response?.data as CharacteristicsMaterialCreateCommand.ResponseEntity;
    }

    console.error(`Standard backend error while create characteristic of material`, response);
    if (response?.errors) {
      errorObject.error = response?.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while create characteristic of material`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error?.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
};
