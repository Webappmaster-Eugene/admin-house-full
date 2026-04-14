'use server';

import { cache } from 'react';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCurrentUser = cache(async () =>
  callAction<UserGetFullInfoCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.users.me)
  )
);
