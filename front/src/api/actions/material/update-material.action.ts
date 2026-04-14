'use server';

import { MaterialUpdateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  updateMaterialDto: MaterialUpdateCommand.Request
) {
  return callAction<MaterialUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.material.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
          .replace(':materialId', materialId),
        updateMaterialDto
      ),
    [`/dashboard/category-materials/${categoryMaterialId}/`, '/dashboard/materials/']
  );
}
