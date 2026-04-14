'use server';

import { cache } from 'react';
import { FieldTypeGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllFieldTypes = cache(async () =>
  callAction<FieldTypeGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.field_type.get_all)
  )
);
