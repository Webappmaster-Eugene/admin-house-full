'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateSectionUpdateCommand } from 'src/shared/contracts/estimate';

export async function updateEstimateSection(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  sectionId: string,
  dto: EstimateSectionUpdateCommand.Request
) {
  return callAction<EstimateSectionUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.estimate.section_update
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
          .replace(':sectionId', sectionId),
        dto
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
