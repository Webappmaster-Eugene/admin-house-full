'use server';

import { FieldOfCategoryMaterialCreateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createFieldOfCategoryMaterial(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryCreateDto: FieldOfCategoryMaterialCreateCommand.Request
) {
  return callAction<FieldOfCategoryMaterialCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.field_category_material.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId),
        fieldOfCategoryCreateDto
      ),
    ['/dashboard/category-materials/', '/dashboard/fields/']
  );
}
