'use server';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export type UpdateUserRolesRequest = {
  rolesIds: number[];
};

export async function updateUserRoles(userId: string, dto: UpdateUserRolesRequest) {
  return callAction<{ uuid: string }>(
    () => axiosInstance.put(axiosEndpoints.users.update.replace(':userId', userId), dto),
    ['/profile/admin/']
  );
}
