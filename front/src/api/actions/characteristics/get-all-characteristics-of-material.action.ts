'use server';

import { CharacteristicsMaterialGetAllCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getAllCharacteristicsOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string
) =>
  callAction<CharacteristicsMaterialGetAllCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.characteristics_material.get_all_in_material
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
    )
  );
