'use server';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function resetPassword(data: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}) {
  return callAction<{ message: string }>(() =>
    axiosInstance.post(axiosEndpoints.auth.reset_password, data)
  );
}
