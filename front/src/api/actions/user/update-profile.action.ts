'use server';

import { UserUpdateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function updateProfile(userId: string, dto: UserUpdateCommand.Request) {
  return callAction<UserUpdateCommand.ResponseEntity>(
    () => axiosInstance.put(axiosEndpoints.users.update.replace(':userId', userId), dto),
    ['/profile/', '/profile/settings/']
  );
}
