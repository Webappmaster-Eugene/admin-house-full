'use server';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function generateAdminKey(secretKey: string) {
  return callAction<{ key: string }>(() =>
    axiosInstance.post(axiosEndpoints.auth.strict_admin_key_generate, { key: secretKey })
  );
}
