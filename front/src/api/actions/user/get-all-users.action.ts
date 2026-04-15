'use server';

import { UserGetAllCommand } from '@numart/house-admin-contracts';

import { callAction } from 'src/api/call-action';
import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllUsers() {
  return callAction<UserGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.users.get_all)
  );
}
