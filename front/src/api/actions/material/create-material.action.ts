'use server';

import { MaterialCreateCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export async function createMaterial(
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  createDto: MaterialCreateCommand.Request
) {
  return callAction<MaterialCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.material.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId),
        createDto
      ),
    [`/dashboard/category-materials/${categoryMaterialId}/`, '/dashboard/materials/']
  );
}
