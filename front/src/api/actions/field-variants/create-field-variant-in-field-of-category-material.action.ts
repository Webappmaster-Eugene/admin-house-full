'use server';

import { FieldVariantsForSelectorFieldTypeCreateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createFieldVariantOfFieldOfCategory(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  createFieldVariantOfCategoryDto: FieldVariantsForSelectorFieldTypeCreateCommand.Request
) {
  return callAction<FieldVariantsForSelectorFieldTypeCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.field_variants.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId),
        createFieldVariantOfCategoryDto
      ),
    ['/dashboard/category-materials/', '/dashboard/fields/']
  );
}
