'use server';

import { cache } from 'react';
import { WorkspaceGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentWorkspace = cache(async (workspaceId: string) =>
  callAction<WorkspaceGetCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.workspace.get.replace(':workspaceId', workspaceId))
  )
);
