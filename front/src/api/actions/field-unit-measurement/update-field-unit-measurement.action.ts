'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { FieldUnitMeasurementUpdateCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementId: string,
  updateFieldUnitMeasurementDto: FieldUnitMeasurementUpdateCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldUnitMeasurementUpdateCommand.Response = await axiosInstance.put(
      axiosEndpoints.field_unit_measurement.update
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldUnitMeasurementId', fieldUnitMeasurementId),
      updateFieldUnitMeasurementDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      revalidatePath('/dashboard/materials/');
      revalidatePath('/dashboard/fields/');
      return response.data as FieldUnitMeasurementUpdateCommand.ResponseEntity;
    }

    console.error(`Standard backend error while update unit measurement in handbook`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while update unit measurement in handbook`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
