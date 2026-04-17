'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateItemDeleteCommand } from 'src/shared/contracts/estimate';

export async function deleteEstimateItem(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  sectionId: string,
  itemId: string
) {
  return callAction<EstimateItemDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.estimate.item_delete
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
          .replace(':sectionId', sectionId)
          .replace(':itemId', itemId)
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
