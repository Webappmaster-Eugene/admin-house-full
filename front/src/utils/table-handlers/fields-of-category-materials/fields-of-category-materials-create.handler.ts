import { ErrorFromBackend } from '@/utils/types/error-from-backend.type';
import { FieldOfCategoryMaterialEditableCreateColumns } from '@/widgets/field-of-category-materials/editable-columns';
import {
  FieldUnitMeasurementGetAllCommand,
  FieldOfCategoryMaterialCreateCommand,
} from '@numart/house-admin-contracts';
import { TFieldsOfCategoryMaterialTableEntity } from '@/widgets/field-of-category-materials/field-of-category-material.entity';
import { createFieldOfCategoryMaterial } from '@/api/actions/field-category-material/create-field-of-category-material.action';
import { isEntityFieldOfCategoryMaterialTypeGuard } from '@/utils/type-guards/is-entity-field-of-category-material.type-guard';
import { FieldOfCategoryMaterialColumnEditableFullSchema } from '@/utils/tables-schemas/field-category/field-category-columns-schema.enum';

export async function fieldOfCategoryMaterialCreateHandler(
  newFieldsOfCategoryMaterialsMaterialInfo: TFieldsOfCategoryMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  unitMeasurements: FieldUnitMeasurementGetAllCommand.ResponseEntity
) {
  const createFieldOfCategoryMaterialDto: FieldOfCategoryMaterialCreateCommand.Request = {
    name: '',
    fieldTypeUuid: '',
    isRequired: true,
    unitOfMeasurementUuid: '',
    fieldOfCategoryMaterialStatus: 'ACTIVE',
  };
  const newUnitMeasurementUuid = unitMeasurements?.find((unitMeasurement) => {
    const unitMeasurementName =
      typeof newFieldsOfCategoryMaterialsMaterialInfo.unitOfMeasurement === 'string'
        ? newFieldsOfCategoryMaterialsMaterialInfo.unitOfMeasurement
        : newFieldsOfCategoryMaterialsMaterialInfo.unitOfMeasurement?.name;
    return unitMeasurement.name === unitMeasurementName;
  })!.uuid;

  Object.entries(newFieldsOfCategoryMaterialsMaterialInfo).forEach(([key, value]) => {
    if (FieldOfCategoryMaterialEditableCreateColumns.includes(key)) {
      switch (key) {
        // case FieldOfCategoryMaterialColumnEditableFullSchema.fieldType:
        //   createFieldOfCategoryMaterialDto[key] = newFieldsOfCategoryMaterialsMaterialInfo[key];
        //   break;
        // case FieldOfCategoryMaterialColumnEditableFullSchema.:
        //   createFieldOfCategoryMaterialDto[key] = Number(value);
        //   break;
        // case FieldOfCategoryMaterialColumnEditableFullSchema.responsiblePartner:
        //   createFieldOfCategoryMaterialDto.responsiblePartnerUuid = newResponsiblePartnerUuid;
        //   break;
        // case FieldOfCategoryMaterialColumnEditableFullSchema.:
        //   createFieldOfCategoryMaterialDto.unitMeasurementUuid = newUnitMeasurementUuid;
        //   break;
        // case FieldOfCategoryMaterialColumnEditableFullSchema.categoryMaterial:
        //   break;
        default:
          if (key === FieldOfCategoryMaterialColumnEditableFullSchema.name) {
            createFieldOfCategoryMaterialDto[key] = newFieldsOfCategoryMaterialsMaterialInfo.name;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.defaultValue) {
            createFieldOfCategoryMaterialDto[key] =
              newFieldsOfCategoryMaterialsMaterialInfo.defaultValue;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.comment) {
            createFieldOfCategoryMaterialDto[key] =
              newFieldsOfCategoryMaterialsMaterialInfo.comment;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.isRequired) {
            createFieldOfCategoryMaterialDto[key] =
              newFieldsOfCategoryMaterialsMaterialInfo.isRequired;
          }
      }
    }
  });

  if (!createFieldOfCategoryMaterialDto?.name) {
    return 'Ошибка при отправке данных. Введите имя, цену, категорию и единицу измерения';
  }
  const newFieldOfCategoryMaterialCreated:
    | FieldOfCategoryMaterialCreateCommand.ResponseEntity
    | ErrorFromBackend = await createFieldOfCategoryMaterial(
    workspaceId,
    handbookId,
    createFieldOfCategoryMaterialDto
  );
  if (isEntityFieldOfCategoryMaterialTypeGuard(newFieldOfCategoryMaterialCreated)) {
    return newFieldOfCategoryMaterialCreated;
  }
  return newFieldOfCategoryMaterialCreated;
}
