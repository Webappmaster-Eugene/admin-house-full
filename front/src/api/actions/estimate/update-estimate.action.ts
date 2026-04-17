'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateUpdateCommand } from 'src/shared/contracts/estimate';

export async function updateEstimate(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  dto: EstimateUpdateCommand.Request
) {
  return callAction<EstimateUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.estimate.update
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId),
        dto
      ),
    [`/dashboard/estimates/${estimateId}/`, '/dashboard/estimates/']
  );
}
