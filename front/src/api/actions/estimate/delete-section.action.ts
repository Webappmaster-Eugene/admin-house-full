'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { EstimateSectionDeleteCommand } from 'src/shared/contracts/estimate';

export async function deleteEstimateSection(
  workspaceId: string,
  projectId: string,
  estimateId: string,
  sectionId: string
) {
  return callAction<EstimateSectionDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.estimate.section_delete
          .replace(':workspaceId', workspaceId)
          .replace(':projectId', projectId)
          .replace(':estimateId', estimateId)
          .replace(':sectionId', sectionId)
      ),
    [`/dashboard/estimates/${estimateId}/`]
  );
}
