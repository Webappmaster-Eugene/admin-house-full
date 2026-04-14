'use server';

import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getOneCategoryMaterialOfHandbook(
  workspaceId: string,
  handbookId: string,
  categoryId: string
) {
  return callAction<CategoryMaterialGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.category_material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryId)
    )
  );
}
