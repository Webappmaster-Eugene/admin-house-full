'use server';

import { MaterialGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getConcreteMaterialInHandbook(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) {
  return callAction<MaterialGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
    )
  );
}
