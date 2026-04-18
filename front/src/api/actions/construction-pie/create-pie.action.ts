'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ConstructionPieCreateCommand } from 'src/shared/contracts/construction-pie';

export async function createConstructionPie(
  workspaceId: string,
  handbookId: string,
  dto: ConstructionPieCreateCommand.Request
) {
  return callAction<ConstructionPieCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.construction_pie.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        dto
      ),
    ['/dashboard/construction-pies/']
  );
}
