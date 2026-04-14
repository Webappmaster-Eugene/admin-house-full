'use server';

import { cache } from 'react';
import { HandbookGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentHandbook = cache(async (workspaceId: string, handbookId: string) =>
  callAction<HandbookGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.handbook.get
        .replace(':handbookId', handbookId)
        .replace(':workspaceId', workspaceId)
    )
  )
);
