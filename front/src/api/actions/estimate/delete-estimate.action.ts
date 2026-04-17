'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateDeleteCommand } from 'src/shared/contracts/estimate';

export async function deleteEstimate(workspaceId: string, projectId: string, estimateId: string) {
  return callAction<EstimateDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.estimate.delete
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
      ),
    ['/dashboard/estimates/']
  );
}
