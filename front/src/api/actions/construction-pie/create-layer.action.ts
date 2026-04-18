'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { PieLayerCreateCommand } from 'src/shared/contracts/construction-pie';

export async function createPieLayer(
  workspaceId: string,
  handbookId: string,
  pieId: string,
  dto: PieLayerCreateCommand.Request
) {
  return callAction<PieLayerCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.construction_pie.layer_create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':pieId', pieId),
        dto
      ),
    [`/dashboard/construction-pies/${pieId}/`]
  );
}
