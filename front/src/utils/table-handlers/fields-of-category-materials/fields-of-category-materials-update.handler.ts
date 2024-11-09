import { updateFieldOfCategoryMaterial } from '@/api/actions/field-category-material/update-field-of-category-material.action';
import { isEntityFieldOfCategoryMaterialTypeGuard } from '@/utils/type-guards/is-entity-field-of-category-material.type-guard';
import {
  FieldTypeGetCommand,
  FieldTypeGetAllCommand,
  FieldOfCategoryMaterialUpdateCommand,
} from '@numart/house-admin-contracts';

export async function fieldsOfCategoryMaterialsUpdateHandler(
  updatedFieldOfCategoryMaterialInfo: FieldOfCategoryMaterialUpdateCommand.Request,
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string,
  allFieldTypes: FieldTypeGetAllCommand.ResponseEntity,
  fieldType?: string | FieldTypeGetCommand.ResponseEntity
) {
  if (fieldType) {
    updatedFieldOfCategoryMaterialInfo.fieldTypeUuid = allFieldTypes.find(
      (fieldTypeElem) =>
        fieldTypeElem?.name === (typeof fieldType === 'string' ? fieldType : fieldType?.name)
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
