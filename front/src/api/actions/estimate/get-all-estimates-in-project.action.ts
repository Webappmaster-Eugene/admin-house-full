'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateGetAllCommand } from 'src/shared/contracts/estimate';

export async function getAllEstimatesInProject(workspaceId: string, projectId: string) {
  return callAction<EstimateGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.estimate.get_all_in_project
        .replace(':workspaceId', workspaceId)
        .replace(':projectId', projectId)
    )
  );
}
