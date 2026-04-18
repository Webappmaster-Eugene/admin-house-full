'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ConstructionPieDeleteCommand } from 'src/shared/contracts/construction-pie';

export async function deleteConstructionPie(
  workspaceId: string,
  handbookId: string,
  pieId: string
) {
  return callAction<ConstructionPieDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.construction_pie.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':pieId', pieId)
      ),
    ['/dashboard/construction-pies/']
  );
}
