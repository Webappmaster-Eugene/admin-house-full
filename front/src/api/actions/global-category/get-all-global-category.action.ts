'use server';

import { cache } from 'react';
import { GlobalCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllGlobalCategories = cache(async () =>
  callAction<GlobalCategoryMaterialGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(axiosEndpoints.global_category_material.get_all)
  )
);
