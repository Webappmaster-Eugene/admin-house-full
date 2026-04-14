'use server';

import { FieldUnitMeasurementCreateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createFieldUnitMeasurement(
  workspaceId: string,
  handbookId: string,
  fieldUnitMeasurementCreateDto: FieldUnitMeasurementCreateCommand.Request
) {
  return callAction<FieldUnitMeasurementCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.field_unit_measurement.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        fieldUnitMeasurementCreateDto
      ),
    ['/dashboard/category-materials/', '/dashboard/materials/', '/dashboard/fields/']
  );
}
