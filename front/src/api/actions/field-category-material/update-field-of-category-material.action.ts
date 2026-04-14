'use server';

import { FieldOfCategoryMaterialUpdateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateFieldOfCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  updateFieldOfCategoryMaterialDto: FieldOfCategoryMaterialUpdateCommand.Request
) {
  return callAction<FieldOfCategoryMaterialUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.field_category_material.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId),
        updateFieldOfCategoryMaterialDto
      ),
    ['/dashboard/category-materials/', '/dashboard/fields/']
  );
}
