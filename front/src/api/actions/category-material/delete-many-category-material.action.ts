'use server';

import { CategoryMaterialDeleteManyCommand } from '@numart/house-admin-contracts/src/commands/category-material/delete-many.command';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteManyCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  deleteManyCategoryMaterialDto: CategoryMaterialDeleteManyCommand.Request
) {
  return callAction<CategoryMaterialDeleteManyCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.category_material.delete_many
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        deleteManyCategoryMaterialDto
      ),
    ['/dashboard/category-materials/']
  );
}
