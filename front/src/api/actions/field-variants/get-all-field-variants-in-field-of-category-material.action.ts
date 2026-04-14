'use server';

import { FieldVariantsForSelectorFieldTypeGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllFieldVariantsOfCategoryOfHandbook(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string
) {
  return callAction<FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.field_variants.get_all_in_field_of_category_material
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':fieldOfCategoryMaterialId', fieldOfCategoryMaterialId)
    )
  );
}
