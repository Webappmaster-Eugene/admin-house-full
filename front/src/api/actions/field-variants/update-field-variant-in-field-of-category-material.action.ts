'use server';

import { FieldVariantsForSelectorFieldTypeUpdateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateFieldVariantOfFieldOfCategory(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  fieldVariantsForSelectorFieldTypeId: string,
  updateFieldVariantDto: FieldVariantsForSelectorFieldTypeUpdateCommand.Request
) {
  return callAction<FieldVariantsForSelectorFieldTypeUpdateCommand.ResponseEntity>(
    () =>
      axiosInstance.put(
        axiosEndpoints.field_variants.update
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId)
          .replace(':fieldVariantsForSelectorFieldTypeId', fieldVariantsForSelectorFieldTypeId),
        updateFieldVariantDto
      )
  );
}
