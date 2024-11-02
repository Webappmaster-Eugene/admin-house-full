import { MaterialEditableColumns } from '@/widgets/materials/editable-columns';
import { isEntityMaterialTypeGuard } from '@/utils/type-guards/is-entity-material.type-guard';
import {
  MaterialUpdateCommand,
  ResponsiblePartnerProducerGetCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import { MaterialColumnEditableFullSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';

import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { updateMaterial } from 'src/api/actions/material/update-material.action';

export async function materialFullRowEditHandler(
  updatedMaterialInfo: TMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  responsiblePartnerProducers: ResponsiblePartnerProducerGetAllCommand.ResponseEntity
) {
  const updateSelfDto: MaterialUpdateCommand.Request = {};
  const newResponsiblePartnerUuid = responsiblePartnerProducers.find(
    (partner: ResponsiblePartnerProducerGetCommand.ResponseEntity) => {
      const responsiblePartnerName =
        typeof updatedMaterialInfo.responsiblePartner === 'string'
          ? updatedMaterialInfo.responsiblePartner
          : updatedMaterialInfo.responsiblePartner?.name;
      return partner.name === responsiblePartnerName;
    }
  )!.uuid;

  Object.entries(updatedMaterialInfo).forEach(([key, value]) => {
    if (MaterialEditableColumns.includes(key)) {
      switch (key) {
        case MaterialColumnEditableFullSchema.sourceInfo:
          if (value !== 'Источник не указан') {
            updateSelfDto[key] = updatedMaterialInfo.sourceInfo;
          }
          break;
        case MaterialColumnEditableFullSchema.price:
          updateSelfDto[key] = Number(value);
          break;
        case MaterialColumnEditableFullSchema.responsiblePartner:
          updateSelfDto.responsiblePartnerUuid = newResponsiblePartnerUuid;
          break;
        default:
          if (key === MaterialColumnEditableFullSchema.name) {
            updateSelfDto[key] = updatedMaterialInfo.name;
          } else if (key === MaterialColumnEditableFullSchema.namePublic) {
            updateSelfDto[key] = updatedMaterialInfo.namePublic;
          } else if (key === MaterialColumnEditableFullSchema.comment) {
            updateSelfDto[key] = updatedMaterialInfo.comment;
          }
      }
    }
  });
  const updatedMaterial = await updateMaterial(
    workspaceId,
    handbookId,
    updatedMaterialInfo.categoryMaterial.uuid,
    updatedMaterialInfo.uuid,
    updateSelfDto
  );

  if (isEntityMaterialTypeGuard(updatedMaterial)) {
    return updatedMaterial;
  }
  return updatedMaterial;
}
