'use server';

import { CharacteristicsMaterialDeleteCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const deleteCharacteristicOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  characteristicsMaterialId: string
) =>
  callAction<CharacteristicsMaterialDeleteCommand.ResponseEntity>(
    () =>
      axiosInstance.delete(
        axiosEndpoints.characteristics_material.delete
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
          .replace(':materialId', materialId)
          .replace(':characteristicsMaterialId', characteristicsMaterialId)
      ),
    [`/dashboard/category-materials/${categoryMaterialId}`, '/dashboard/materials/']
  );
