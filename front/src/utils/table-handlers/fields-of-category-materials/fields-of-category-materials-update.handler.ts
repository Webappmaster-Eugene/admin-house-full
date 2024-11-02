import { FieldTypeGetAllCommand } from '@numart/house-admin-contracts';
import { TFieldsOfCategoryMaterialTableEntity } from '@/widgets/field-of-category-materials/field-of-category-material.entity';
import { updateFieldOfCategoryMaterial } from '@/api/actions/field-category-material/update-field-of-category-material.action';
import { isEntityFieldOfCategoryMaterialTypeGuard } from '@/utils/type-guards/is-entity-field-of-category-material.type-guard';

export async function fieldsOfCategoryMaterialsUpdateHandler(
  updatedFieldOfCategoryMaterialInfo: TFieldsOfCategoryMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  allFieldTypes: FieldTypeGetAllCommand.ResponseEntity
) {
  if (updatedFieldOfCategoryMaterialInfo.fieldType) {
    updatedFieldOfCategoryMaterialInfo.fieldTypeUuid = allFieldTypes.find(
      (fieldType) =>
        fieldType?.name ===
        (typeof updatedFieldOfCategoryMaterialInfo?.fieldType === 'string'
          ? updatedFieldOfCategoryMaterialInfo?.fieldType
          : updatedFieldOfCategoryMaterialInfo?.fieldType?.name)
    )?.uuid as string;
    // @ts-ignore
    delete updatedFieldOfCategoryMaterialInfo.fieldType;
  }

  const updatedFieldOfCategoryMaterial = await updateFieldOfCategoryMaterial(
    workspaceId,
    handbookId,
    fieldOfCategoryMaterialId,
    updatedFieldOfCategoryMaterialInfo
  );
  if (isEntityFieldOfCategoryMaterialTypeGuard(updatedFieldOfCategoryMaterial)) {
    return updatedFieldOfCategoryMaterial;
  }
  return updatedFieldOfCategoryMaterial;
}
