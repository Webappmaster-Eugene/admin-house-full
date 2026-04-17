'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateSectionCreateCommand } from 'src/shared/contracts/estimate';

export async function createEstimateSection(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  dto: EstimateSectionCreateCommand.Request
) {
  return callAction<EstimateSectionCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.estimate.section_create
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId),
        dto
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
