'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateCreateCommand } from 'src/shared/contracts/estimate';

export async function createEstimate(
  workspaceId: string,
  projectId: string,
  dto: EstimateCreateCommand.Request
) {
  return callAction<EstimateCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.estimate.create
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId),
        dto
      ),
    ['/dashboard/estimates/']
  );
}
