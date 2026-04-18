'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { PieLayerDeleteCommand } from 'src/shared/contracts/construction-pie';

export async function deletePieLayer(
  workspaceId: string,
  handbookId: string,
  pieId: string,
  layerId: string
) {
  return callAction<PieLayerDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.construction_pie.layer_delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':pieId', pieId)
          .replace(':layerId', layerId)
      ),
    [`/dashboard/construction-pies/${pieId}/`]
  );
}
