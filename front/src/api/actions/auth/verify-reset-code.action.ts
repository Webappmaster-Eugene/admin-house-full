'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function verifyResetCode(data: { email: string; code: string }) {
  return callAction<{ message: string }>(() =>
    axiosInstance.post(axiosEndpoints.auth.verify_reset_code, data)
  );
}
