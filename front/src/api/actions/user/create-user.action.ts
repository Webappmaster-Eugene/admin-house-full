'use server';

import { UserCreateCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createUser(dto: UserCreateCommand.Request) {
  return callAction<UserCreateCommand.ResponseEntity>(
    () => axiosInstance.post(axiosEndpoints.users.create, dto),
    ['/profile/admin/']
  );
}
