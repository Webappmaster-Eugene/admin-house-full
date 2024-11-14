'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { FieldUnitMeasurementDeleteCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementId: string
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldUnitMeasurementDeleteCommand.Response = await axiosInstance.delete(
      axiosEndpoints.field_unit_measurement.delete
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldUnitMeasurementId', fieldUnitMeasurementId)
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      revalidatePath('/dashboard/materials/');
      revalidatePath('/dashboard/fields/');
      return response.data as FieldUnitMeasurementDeleteCommand.ResponseEntity;
    }

    console.error(`Standard backend error while delete unit measurement in handbook`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while delete unit measurement in handbook`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
