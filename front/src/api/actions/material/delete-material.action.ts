'use server';

import { MaterialDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) {
  return callAction<MaterialDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.material.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
          .replace(':materialId', materialId)
      ),
    [`/dashboard/category-materials/${categoryMaterialId}/`, '/dashboard/materials/']
  );
}
