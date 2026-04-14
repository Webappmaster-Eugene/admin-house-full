'use server';

import { CategoryMaterialCreateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  createCategoryMaterialDto: CategoryMaterialCreateCommand.Request
) {
  return callAction<CategoryMaterialCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.category_material.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        createCategoryMaterialDto
      ),
    ['/dashboard/category-materials/']
  );
}
