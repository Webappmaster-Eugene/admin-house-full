'use server';

import { FieldUnitMeasurementUpdateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementId: string,
  updateFieldUnitMeasurementDto: FieldUnitMeasurementUpdateCommand.Request
) {
  return callAction<FieldUnitMeasurementUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.field_unit_measurement.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldUnitMeasurementId', fieldUnitMeasurementId),
        updateFieldUnitMeasurementDto
      ),
    ['/dashboard/category-materials/', '/dashboard/materials/', '/dashboard/fields/']
  );
}
