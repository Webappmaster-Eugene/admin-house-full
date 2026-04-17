'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateItemUpdateCommand } from 'src/shared/contracts/estimate';

export async function updateEstimateItem(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  sectionId: string,
  itemId: string,
  dto: EstimateItemUpdateCommand.Request
) {
  return callAction<EstimateItemUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.estimate.item_update
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
          .replace(':sectionId', sectionId)
          .replace(':itemId', itemId),
        dto
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
