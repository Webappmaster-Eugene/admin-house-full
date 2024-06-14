'use server';

import { cache } from 'react';
import { AxiosError } from 'axios';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { axiosEndpoints } from 'src/utils/auth';
import { STATUS_CODES } from 'src/utils/const/status-codes';

import axiosInstance from 'src/api/axios-instance';

export const getCurrentUser = cache(async () => {
  try {
    const response: UserGetFullInfoCommand.Response = await axiosInstance.get(
      axiosEndpoints.users.me
    );
    if (response.statusCode === STATUS_CODES.OK) {
      return response.data as UserGetFullInfoCommand.ResponseEntity;
    }
    console.error(response.data);
    if (response?.errors) {
      return response.errors[0];
    }
    return response.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error.message);
      return error.message;
    }
    console.error(error);
    return JSON.stringify(error);
  }
});
