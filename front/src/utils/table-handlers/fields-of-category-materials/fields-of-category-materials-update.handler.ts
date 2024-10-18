import { ResponsiblePartnerProducerGetAllCommand } from '@numart/house-admin-contracts';

import { isEntityMaterialTG } from 'src/utils/type-guards/is-entity-material-when-create.type-guard';

import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { updateMaterial } from 'src/api/actions/material/update-material.action';

export async function fieldsOfCategoryMaterialsUpdateHandler(
  updatedMaterialInfo: TMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  responsiblePartnerProducers?: ResponsiblePartnerProducerGetAllCommand.ResponseEntity
) {
  console.log(updatedMaterialInfo);
  const updatedMaterial = await updateMaterial(
    workspaceId,
    handbookId,
    categoryMaterialId,
    materialId,
    updatedMaterialInfo
  );
  if (isEntityMaterialTG(updatedMaterial)) {
    return updatedMaterial;
  }
  return updatedMaterial;
}
