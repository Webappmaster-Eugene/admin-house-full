'use server';

import { FieldVariantsForSelectorFieldTypeDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteFieldVariantOfFieldOfCategory(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  fieldVariantsForSelectorFieldTypeId: string
) {
  return callAction<FieldVariantsForSelectorFieldTypeDeleteCommand.ResponseEntity>(() =>
    axiosInstance.delete(
      axiosEndpoints.field_variants.delete
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId)
        .replace(':fieldVariantsForSelectorFieldTypeId', fieldVariantsForSelectorFieldTypeId)
    )
  );
}
