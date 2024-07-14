import {
  MaterialGetCommand,
  MaterialCreateCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetAllCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@/../../back/libs/contracts';

import {
  MaterialColumnSchema,
  MaterialColumnEditableFullSchema,
} from 'src/utils/tables-schemas/material/material-columns-schema.enum';

import { createMaterial } from 'src/api/actions/material/create-material.action';
import { MaterialEditableCreateColumns } from 'src/widgets/materials/editable-rows';

export async function materialCreateHandler(
  newMaterial: MaterialGetCommand.ResponseEntity,
  workspaceId: string,
  handbookId: string,
  responsiblePartnerProducers: ResponsiblePartnerProducerGetAllCommand.ResponseEntity,
  categoryMaterials: CategoryMaterialGetAllCommand.ResponseEntity,
  unitMeasurements: FieldUnitMeasurementGetAllCommand.ResponseEntity
) {
  const createMaterialDto: MaterialCreateCommand.Request = {};
  const newResponsiblePartnerUuid = responsiblePartnerProducers.find(
    (partner) => partner.name === newMaterial[MaterialColumnSchema.responsiblePartner]
  ).uuid;
  const newCategoryMaterialUuid = categoryMaterials.find(
    (categoryMaterial) =>
      categoryMaterial.name === newMaterial[MaterialColumnSchema.categoryMaterial]
  ).uuid;
  const newUnitMeasurementUuid = unitMeasurements.find(
    (unitMeasurement) => unitMeasurement.name === newMaterial[MaterialColumnSchema.unitMeasurement]
  ).uuid;

  Object.entries(newMaterial).forEach(([key, value]) => {
    if (MaterialEditableCreateColumns.includes(key)) {
      switch (key) {
        case MaterialColumnEditableFullSchema.sourceInfo:
          if (value !== 'Укажите источник') {
            createMaterialDto[key] = value;
          }
          break;
        case MaterialColumnEditableFullSchema.price:
          createMaterialDto[key] = Number(value);
          break;
        case MaterialColumnEditableFullSchema.responsiblePartner:
          createMaterialDto[MaterialColumnEditableFullSchema.responsiblePartnerUuid] =
            newResponsiblePartnerUuid;
          break;
        case MaterialColumnEditableFullSchema.categoryMaterial:
          createMaterialDto[MaterialColumnEditableFullSchema.categoryMaterialUuid] =
            newCategoryMaterialUuid;
          break;
        case MaterialColumnEditableFullSchema.unitMeasurement:
          console.log('key', key);
          createMaterialDto[MaterialColumnEditableFullSchema.unitMeasurementUuid] =
            newUnitMeasurementUuid;
          console.log(
            'createMaterialDto[MaterialColumnEditableFullSchema.unitMeasurementUuid]',
            createMaterialDto[MaterialColumnEditableFullSchema.unitMeasurementUuid]
          );
          break;
        default:
          if (
            key !== MaterialColumnEditableFullSchema.responsiblePartnerUuid &&
            key !== MaterialColumnEditableFullSchema.categoryMaterialUuid &&
            key !== MaterialColumnEditableFullSchema.responsiblePartnerUuid
          ) {
            createMaterialDto[key] = value;
          }
      }
    }
  });

  const newMaterialCreated = await createMaterial(
    workspaceId,
    handbookId,
    newCategoryMaterialUuid,
    createMaterialDto
  );
  console.log('newMaterialCreated', newMaterialCreated);
}
