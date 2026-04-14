'use server';

import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllCategoryMaterialOfHandbook(workspaceId: string, handbookId: string) {
  return callAction<CategoryMaterialGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.category_material.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
