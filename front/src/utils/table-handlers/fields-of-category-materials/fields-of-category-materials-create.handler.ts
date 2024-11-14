import { FieldOfCategoryMaterialCreateCommand } from '@numart/house-admin-contracts';
import { TFieldsOfCategoryMaterialTableEntity } from '@/widgets/field-of-category-materials/field-of-category-material.entity';

import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import { FieldOfCategoryMaterialColumnEditableFullSchema } from 'src/utils/tables-schemas/field-category/field-category-columns-schema.enum';

import { FieldOfCategoryMaterialEditableCreateColumns } from 'src/widgets/field-of-category-materials/editable-columns';
import { createFieldOfCategoryMaterial } from 'src/api/actions/field-category-material/create-field-of-category-material.action';

export async function fieldOfCategoryMaterialCreateHandler(
  newFieldsOfCategoryMaterialsMaterialInfo: TFieldsOfCategoryMaterialTableEntity,
  workspaceId: string,
  handbookId: string
) {
  const createFieldOfCategoryMaterialDto: FieldOfCategoryMaterialCreateCommand.Request = {
    name: '',
    fieldTypeUuid: '',
    isRequired: true,
    unitOfMeasurementUuid: '',
    fieldOfCategoryMaterialStatus: 'ACTIVE',
  };

  Object.entries(newFieldsOfCategoryMaterialsMaterialInfo).forEach(([key, value]) => {
    if (FieldOfCategoryMaterialEditableCreateColumns.includes(key)) {
      switch (key) {
        default:
          if (key === FieldOfCategoryMaterialColumnEditableFullSchema.name) {
            createFieldOfCategoryMaterialDto[key] = value as string;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.defaultValue) {
            createFieldOfCategoryMaterialDto[key] = value as string;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.comment) {
            createFieldOfCategoryMaterialDto[key] = value as string;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.isRequired) {
            createFieldOfCategoryMaterialDto[key] = !!value;
          } else if (key === FieldOfCategoryMaterialColumnEditableFullSchema.fieldTypeUuid) {
            createFieldOfCategoryMaterialDto.fieldTypeUuid = value as string;
          } else if (
            key === FieldOfCategoryMaterialColumnEditableFullSchema.unitOfMeasurementUuid
          ) {
            createFieldOfCategoryMaterialDto.unitOfMeasurementUuid = value as string;
          }
      }
    }
  });

  if (
    !createFieldOfCategoryMaterialDto?.name ||
    !createFieldOfCategoryMaterialDto?.unitOfMeasurementUuid ||
    !createFieldOfCategoryMaterialDto?.fieldTypeUuid
  ) {
    console.error(
      'Ошибка при отправке данных для создания поля категории. Введите имя, тип поля и единицу измерения'
    );
  }

  const newFieldOfCategoryMaterialCreated:
    | FieldOfCategoryMaterialCreateCommand.ResponseEntity
    | ErrorFromBackend = await createFieldOfCategoryMaterial(
    workspaceId,
    handbookId,
    createFieldOfCategoryMaterialDto
  );

  return newFieldOfCategoryMaterialCreated;
}
