'use server';

import { AxiosError } from 'axios';
import { UserGetAllCommand } from '@numart/house-admin-contracts';

import { axiosEndpoints } from 'src/utils/auth';
import { STATUS_CODES } from 'src/utils/const/status-codes';

import axiosInstance from 'src/api/axios-instance';

export async function getAllUsers() {
  try {
    console.log('fd3453444444444444', 6776);
    const response: UserGetAllCommand.Response = await axiosInstance.get(
      axiosEndpoints.users.get_all
    );
    console.log('fdfsergerger', response);

    if (response.statusCode === STATUS_CODES.OK) {
      return response.data as UserGetAllCommand.ResponseEntity;
    }
    console.error(response.errors, response.message);
    return response.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      return error.message;
    }
    console.error(error);
    return JSON.stringify(error);
  }
}
