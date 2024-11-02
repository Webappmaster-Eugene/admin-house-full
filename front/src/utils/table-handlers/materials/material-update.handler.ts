import { ResponsiblePartnerProducerGetAllCommand } from '@numart/house-admin-contracts';
import { isEntityMaterialTypeGuard } from '@/utils/type-guards/is-entity-material.type-guard';

import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { updateMaterial } from 'src/api/actions/material/update-material.action';

export async function materialUpdateHandler(
  updatedMaterialInfo: TMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  categoryMaterialId: string,
  materialId: string,
  responsiblePartnerProducers?: ResponsiblePartnerProducerGetAllCommand.ResponseEntity
) {
  // const newResponsiblePartnerUuid =
  //   responsiblePartnerProducers &&
  //   responsiblePartnerProducers.find(
  //     (partner: ResponsiblePartnerProducerGetCommand.ResponseEntity) => {
  //       const responsiblePartnerName =
  //         typeof updatedMaterialInfo.responsiblePartner === 'string'
  //           ? updatedMaterialInfo.responsiblePartner
  //           : updatedMaterialInfo.responsiblePartner?.name;
  //       return partner.name === responsiblePartnerName;
  //     }
  //   )!.uuid;

  // Object.entries(updatedMaterialInfo).forEach(([key, value]) => {
  //   if (MaterialEditableColumns.includes(key)) {
  //     switch (key) {
  //       case MaterialColumnEditableFullSchema.sourceInfo:
  //         if (value !== 'Источник не указан') {
  //           updateSelfDto[key] = updatedMaterialInfo.sourceInfo;
  //         }
  //         break;
  //       case MaterialColumnEditableFullSchema.price:
  //         updateSelfDto[key] = Number(value);
  //         break;
  //       case MaterialColumnEditableFullSchema.responsiblePartner:
  //         if (newResponsiblePartnerUuid) {
  //           updateSelfDto.responsiblePartnerUuid = newResponsiblePartnerUuid;
  //         }
  //         break;
  //       default:
  //         if (key === MaterialColumnEditableFullSchema.name) {
  //           updateSelfDto[key] = updatedMaterialInfo.name;
  //         } else if (key === MaterialColumnEditableFullSchema.namePublic) {
  //           updateSelfDto[key] = updatedMaterialInfo.namePublic;
  //         } else if (key === MaterialColumnEditableFullSchema.comment) {
  //           updateSelfDto[key] = updatedMaterialInfo.comment;
  //         }
  //     }
  //   }
  // });
  const updatedMaterial = await updateMaterial(
    workspaceId,
    handbookId,
    categoryMaterialId,
    materialId,
    updatedMaterialInfo
  );
  if (isEntityMaterialTypeGuard(updatedMaterial)) {
    return updatedMaterial;
  }
  return updatedMaterial;
}
