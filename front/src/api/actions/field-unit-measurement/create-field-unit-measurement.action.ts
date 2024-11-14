'use server';

import { AxiosError } from 'axios';
import { revalidatePath } from 'next/cache';
import { FieldUnitMeasurementCreateCommand } from '@numart/house-admin-contracts';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { isGoodHttpCode } from 'src/utils/helpers/is-good-http-code.helper';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementCreateDto: FieldUnitMeasurementCreateCommand.Request
) {
  const errorObject: ErrorFromBackend = {
    error: null,
  };

  try {
    const response: FieldUnitMeasurementCreateCommand.Response = await axiosInstance.post(
      axiosEndpoints.field_unit_measurement.create
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId),
      fieldUnitMeasurementCreateDto
    );

    if (isGoodHttpCode(response?.statusCode)) {
      revalidatePath('/dashboard/category-materials/');
      revalidatePath('/dashboard/materials/');
      revalidatePath('/dashboard/fields/');
      return response.data as FieldUnitMeasurementCreateCommand.ResponseEntity;
    }

    console.error(`Standard backend error while create new unit measurement in handbook`, response);
    if (response?.errors) {
      errorObject.error = response.errors[0];
      return errorObject;
    }
    errorObject.error = response?.message;
    return errorObject;
  } catch (error: unknown) {
    console.error(`Catched frontend error while create new unit measurement in handbook`, error);
    if (error instanceof AxiosError) {
      errorObject.error = error.message;
      return errorObject;
    }
    errorObject.error = JSON.stringify(error);
    return errorObject;
  }
}
