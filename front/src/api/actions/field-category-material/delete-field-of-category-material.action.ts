'use server';

import { FieldOfCategoryMaterialDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteFieldOfCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string
) {
  return callAction<FieldOfCategoryMaterialDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.field_category_material.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId)
      ),
    ['/dashboard/category-materials/', '/dashboard/fields/']
  );
}
