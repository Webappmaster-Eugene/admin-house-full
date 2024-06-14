'use server';

import { AxiosError } from 'axios';
import { AppInfoGetCommand } from '@numart/house-admin-contracts';

import { axiosEndpoints } from 'src/utils/auth';
import { STATUS_CODES } from 'src/utils/const/status-codes';

import axiosInstance from 'src/api/axios-instance';

export async function getAppInfo() {
  try {
    const response: AppInfoGetCommand.Response = await axiosInstance.get(
      axiosEndpoints.app_info.get
    );
    console.log(response);
    if (response.statusCode === STATUS_CODES.OK) {
      return response.data as AppInfoGetCommand.ResponseEntity;
    }
    console.error(response.errors, response.message);
    return response.message;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(error.code, error.message);
      return error.message;
    }
    return error;
  }
}
