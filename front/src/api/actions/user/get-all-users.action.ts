'use server';

import { UserGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function getAllUsers() {
  return callAction<UserGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.users.get_all)
  );
}
