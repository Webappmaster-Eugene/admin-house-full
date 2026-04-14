'use server';

import { FieldVariantsForSelectorFieldTypeGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllFieldVariantsInHandbook(workspaceId: string, handbookId: string) {
  return callAction<FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.field_variants.get_all_in_handbook
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
    )
  );
}
