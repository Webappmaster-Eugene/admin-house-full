'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { PieLayerUpdateCommand } from 'src/shared/contracts/construction-pie';

export async function updatePieLayer(
  workspaceId: string,
  handbookId: string,
  pieId: string,
  layerId: string,
  dto: PieLayerUpdateCommand.Request
) {
  return callAction<PieLayerUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.construction_pie.layer_update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':pieId', pieId)
          .replace(':layerId', layerId),
        dto
      ),
    [`/dashboard/construction-pies/${pieId}/`]
  );
}
