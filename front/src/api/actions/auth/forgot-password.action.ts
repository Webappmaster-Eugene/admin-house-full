'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function forgotPassword(data: { email: string }) {
  return callAction<{ message: string }>(() =>
    axiosInstance.post(axiosEndpoints.auth.forgot_password, data)
  );
}
