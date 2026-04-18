'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ConstructionPieGetAllCommand } from 'src/shared/contracts/construction-pie';

export async function getAllConstructionPies(workspaceId: string, handbookId: string) {
  return callAction<ConstructionPieGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.construction_pie.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
