'use server';

import { CategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  updateCategoryMaterialDto: CategoryMaterialUpdateCommand.Request
) {
  return callAction<CategoryMaterialUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.category_material.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId),
        updateCategoryMaterialDto
      ),
    ['/dashboard/category-materials/']
  );
}
