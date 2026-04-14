'use server';

import { MaterialGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllMaterialsInCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string
) {
  return callAction<MaterialGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.material.get_all_in_category_material
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
    )
  );
}
