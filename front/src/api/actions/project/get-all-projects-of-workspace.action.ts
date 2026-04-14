'use server';

import { ProjectGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllProjectsOfWorkspace(workspaceId: string) {
  return callAction<ProjectGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.project.get_all_in_workspace.replace(':workspaceId', workspaceId)
    )
  );
}
