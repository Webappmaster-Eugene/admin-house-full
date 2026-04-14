'use server';

import { AppInfoGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from '@/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAppInfo() {
  return callAction<AppInfoGetCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.app_info.get)
  );
}
