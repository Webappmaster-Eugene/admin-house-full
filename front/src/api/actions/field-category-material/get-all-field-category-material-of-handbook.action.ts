'use server';

import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllFieldOfCategoryOfHandbook(workspaceId: string, handbookId: string) {
  return callAction<FieldOfCategoryMaterialGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.field_category_material.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
