'use server';

import { UserDeleteCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function deleteUser(userId: string) {
  return callAction<UserDeleteCommand.ResponseEntity>(
    () => axiosInstance.delete(axiosEndpoints.users.delete.replace(':userId', userId)),
    ['/profile/admin/']
  );
}
