import {
  MaterialGetCommand,
  MaterialUpdateCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@/../../back/libs/contracts';

import {
  MaterialColumnSchema,
  MaterialColumnEditableFullSchema,
} from 'src/utils/tables-schemas/material/material-columns-schema.enum';

import { MaterialEditableColumns } from 'src/widgets/materials/editable-rows';
import { updateMaterial } from 'src/api/actions/material/update-material.action';

export async function materialEditHandler(
  material: MaterialGetCommand.ResponseEntity,
  responsiblePartnerProducers: ResponsiblePartnerProducerGetAllCommand.ResponseEntity
) {
  const updateSelfDto: MaterialUpdateCommand.Request = {};
  const newResponsiblePartnerUuid = responsiblePartnerProducers.find(
    (partner) => partner.name === material[MaterialColumnSchema.responsiblePartner]
  )?.uuid;

  Object.entries(material).forEach(([key, value]) => {
    if (MaterialEditableColumns.includes(key)) {
      switch (key) {
        case MaterialColumnEditableFullSchema.sourceInfo:
          if (value !== 'Источник не указан') {
            updateSelfDto[key] = value;
          }
          break;
        case MaterialColumnEditableFullSchema.price:
          updateSelfDto[key] = Number(value);
          break;
        case MaterialColumnEditableFullSchema.responsiblePartnerUuid:
          updateSelfDto[MaterialColumnEditableFullSchema.responsiblePartnerUuid] =
            newResponsiblePartnerUuid;
          break;
        default:
          if (
            key !== MaterialColumnEditableFullSchema.responsiblePartner &&
            key !== MaterialColumnEditableFullSchema.categoryMaterial &&
            key !== MaterialColumnEditableFullSchema.responsiblePartner
          ) {
            updateSelfDto[key] = value;
          }
      }
    }
  });
  const updatedMaterial = await updateMaterial(
    material.handbook.workspaceUuid,
    material.handbookUuid,
    material.categoryMaterialUuid,
    material.uuid,
    updateSelfDto
  );
  console.log('updatedMaterial', updatedMaterial);
}
