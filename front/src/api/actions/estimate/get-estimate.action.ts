'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateGetCommand } from 'src/shared/contracts/estimate';

export async function getEstimate(workspaceId: string, projectId: string, estimateId: string) {
  return callAction<EstimateGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.estimate.get
        .replace(':workspaceId', workspaceId)
        .replace(':projectId', projectId)
        .replace(':estimateId', estimateId)
    )
  );
}
