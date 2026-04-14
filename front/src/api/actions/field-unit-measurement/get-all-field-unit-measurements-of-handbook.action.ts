'use server';

import { FieldUnitMeasurementGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllFieldUnitMeasurementsOfHandbook(
  workspaceId: string,
  handbookId: string
) {
  return callAction<FieldUnitMeasurementGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.field_unit_measurement.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
