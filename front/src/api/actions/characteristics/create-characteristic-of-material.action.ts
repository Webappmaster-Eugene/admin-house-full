'use server';

import {
  CharacteristicsMaterialGetCommand,
  CharacteristicsMaterialCreateCommand,
} from '@numart/house-admin-contracts';

import axiosInstance from 'src/api/axios-instance';
import { callAction } from 'src/api/call-action';
import { axiosEndpoints } from 'src/entities/auth/lib';

export const createCharacteristicOfMaterial = async (
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  fieldCategoryMaterialId: string,
  createCharacteristicMaterialDto: CharacteristicsMaterialCreateCommand.Request
) =>
  callAction<CharacteristicsMaterialCreateCommand.ResponseEntity>(
    () =>
      axiosInstance.post(
        axiosEndpoints.characteristics_material.create
          .replace(':workspaceId', workspaceId)
          .replace(':handbookId', handbookId)
          .replace(':categoryMaterialId', categoryMaterialId)
          .replace(':materialId', materialId)
          .replace(':fieldCategoryMaterialId', fieldCategoryMaterialId),
        createCharacteristicMaterialDto
      ),
    [`/dashboard/category-materials/${categoryMaterialId}/`, '/dashboard/materials/']
  );
