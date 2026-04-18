'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ConstructionPieUpdateCommand } from 'src/shared/contracts/construction-pie';

export async function updateConstructionPie(
  workspaceId: string,
  handbookId: string,
  pieId: string,
  dto: ConstructionPieUpdateCommand.Request
) {
  return callAction<ConstructionPieUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.construction_pie.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':pieId', pieId),
        dto
      ),
    [`/dashboard/construction-pies/${pieId}/`, '/dashboard/construction-pies/']
  );
}
