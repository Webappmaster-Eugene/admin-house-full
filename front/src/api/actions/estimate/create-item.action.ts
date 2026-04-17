'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateItemCreateCommand } from 'src/shared/contracts/estimate';

export async function createEstimateItem(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  sectionId: string,
  dto: EstimateItemCreateCommand.Request
) {
  return callAction<EstimateItemCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.estimate.item_create
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
          .replace(':sectionId', sectionId),
        dto
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
