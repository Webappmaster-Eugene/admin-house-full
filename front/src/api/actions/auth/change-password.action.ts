'use server';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export async function changePassword(dto: ChangePasswordRequest) {
  return callAction<{ ok: boolean }>(() =>
    axiosInstance.post(axiosEndpoints.auth.change_password, dto)
  );
}
