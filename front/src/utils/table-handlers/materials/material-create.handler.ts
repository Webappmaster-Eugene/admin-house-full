import { ErrorFromBackend } from '@/utils/types/error-from-backend.type';
import { MaterialEditableCreateColumns } from '@/widgets/materials/editable-columns';
import { isEntityMaterialTypeGuard } from '@/utils/type-guards/is-entity-material.type-guard';
import {
  MaterialCreateCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetAllCommand,
  ResponsiblePartnerProducerGetCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import { MaterialColumnEditableFullSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';

import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { createMaterial } from 'src/api/actions/material/create-material.action';

export async function materialCreateHandler(
  newMaterial: TMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  responsiblePartnerProducers: ResponsiblePartnerProducerGetAllCommand.ResponseEntity,
  categoryMaterials: CategoryMaterialGetAllCommand.ResponseEntity,
  unitMeasurements: FieldUnitMeasurementGetAllCommand.ResponseEntity
) {
  const createMaterialDto: MaterialCreateCommand.Request = {
    name: '',
    price: 0,
    unitMeasurementUuid: '',
    materialStatus: 'ACTIVE',
    sourceInfo: '',
  };
  const newResponsiblePartnerUuid = responsiblePartnerProducers.find(
    (partner: ResponsiblePartnerProducerGetCommand.ResponseEntity) => {
      const responsiblePartnerName =
        typeof newMaterial.responsiblePartner === 'string'
          ? newMaterial.responsiblePartner
          : newMaterial.responsiblePartner?.name;
      return partner.name === responsiblePartnerName;
    }
  )!.uuid;

  const newCategoryMaterialUuid = categoryMaterials?.find((categoryMaterial) => {
    const categoryMaterialName =
      typeof newMaterial.categoryMaterial === 'string'
        ? newMaterial.categoryMaterial
        : newMaterial.categoryMaterial?.name;
    return categoryMaterial.name === categoryMaterialName;
  })!.uuid;

  const newUnitMeasurementUuid = unitMeasurements?.find((unitMeasurement) => {
    const unitMeasurementName =
      typeof newMaterial.unitMeasurement === 'string'
        ? newMaterial.unitMeasurement
        : newMaterial.unitMeasurement?.name;
    return unitMeasurement.name === unitMeasurementName;
  })!.uuid;

  Object.entries(newMaterial).forEach(([key, value]) => {
    if (MaterialEditableCreateColumns.includes(key)) {
      switch (key) {
        case MaterialColumnEditableFullSchema.sourceInfo:
          if (value !== 'Укажите источник') {
            createMaterialDto[key] = newMaterial[key];
          }
          break;
        case MaterialColumnEditableFullSchema.price:
          createMaterialDto[key] = Number(value);
          break;
        case MaterialColumnEditableFullSchema.responsiblePartner:
          createMaterialDto.responsiblePartnerUuid = newResponsiblePartnerUuid;
          break;
        case MaterialColumnEditableFullSchema.unitMeasurement:
          createMaterialDto.unitMeasurementUuid = newUnitMeasurementUuid;
          break;
        case MaterialColumnEditableFullSchema.categoryMaterial:
          break;
        default:
          if (key === MaterialColumnEditableFullSchema.name) {
            createMaterialDto[key] = newMaterial.name;
          } else if (key === MaterialColumnEditableFullSchema.namePublic) {
            createMaterialDto[key] = newMaterial.namePublic;
          } else if (key === MaterialColumnEditableFullSchema.comment) {
            createMaterialDto[key] = newMaterial.comment;
          }
      }
    }
  });

  if (!createMaterialDto?.name) {
    return 'Ошибка при отправке данных. Введите имя, цену, категорию и единицу измерения';
  }
  const newMaterialCreated: MaterialCreateCommand.ResponseEntity | ErrorFromBackend =
    await createMaterial(workspaceId, handbookId, newCategoryMaterialUuid, createMaterialDto);
  if (isEntityMaterialTypeGuard(newMaterialCreated)) {
    return newMaterialCreated;
  }
  return newMaterialCreated;
}
