'use server';

import { OrganizationGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllOrganizationsOfWorkspace(workspaceId: string) {
  return callAction<OrganizationGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.organization.get_all_in_workspace.replace(':workspaceId', workspaceId)
    )
  );
}
