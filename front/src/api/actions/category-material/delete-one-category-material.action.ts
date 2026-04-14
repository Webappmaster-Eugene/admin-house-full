'use server';

import { CategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteOneCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: CategoryMaterialDeleteCommand.RequestParam
) {
  return callAction<CategoryMaterialDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.category_material.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
      ),
    ['/dashboard/category-materials/']
  );
}
