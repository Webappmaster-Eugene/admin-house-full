'use server';

import { FieldUnitMeasurementDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementId: string
) {
  return callAction<FieldUnitMeasurementDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.field_unit_measurement.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldUnitMeasurementId', fieldUnitMeasurementId)
      ),
    ['/dashboard/category-materials/', '/dashboard/materials/', '/dashboard/fields/']
  );
}
