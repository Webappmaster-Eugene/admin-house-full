'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ConstructionPieGetCommand } from 'src/shared/contracts/construction-pie';

export async function getConstructionPie(workspaceId: string, handbookId: string, pieId: string) {
  return callAction<ConstructionPieGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.construction_pie.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':pieId', pieId)
    )
  );
}
