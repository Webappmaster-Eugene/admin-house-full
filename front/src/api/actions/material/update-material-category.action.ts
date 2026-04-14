'use server';

import { MaterialUpdateCategoryCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateMaterialCategory(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  updateCategoryOfMaterialDto: MaterialUpdateCategoryCommand.Request
) {
  return callAction<MaterialUpdateCategoryCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.material.change_category
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
          .replace(':materialId', materialId),
        updateCategoryOfMaterialDto
      ),
    [`/dashboard/category-materials/${categoryMaterialId}/`, '/dashboard/materials/']
  );
}
