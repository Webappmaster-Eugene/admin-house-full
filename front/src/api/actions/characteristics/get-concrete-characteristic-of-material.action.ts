'use server';

import { CharacteristicsMaterialGetCommand } from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const getCharacteristicOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  characteristicsMaterialId: string
) =>
  callAction<CharacteristicsMaterialGetCommand.ResponseEntity>(() =>
    axiosInstance.get(
      axiosEndpoints.characteristics_material.get
        .replace(':workspaceId', workspaceId)
        .replace(':handbookId', handbookId)
        .replace(':categoryMaterialId', categoryMaterialId)
        .replace(':materialId', materialId)
        .replace(':characteristicsMaterialId', characteristicsMaterialId)
    )
  );
