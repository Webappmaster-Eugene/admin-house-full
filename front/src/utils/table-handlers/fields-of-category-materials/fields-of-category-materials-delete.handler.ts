import { isEntityMaterialTypeGuard } from '@/utils/type-guards/is-entity-material.type-guard';
import { deleteFieldOfCategoryMaterial } from '@/api/actions/field-category-material/delete-field-of-category-material.action';

export async function fieldsOfCategoryMaterialsDeleteHandler(
  workspaceId: string,
  handbookId: string,
  fieldOfCategoryMaterialId: string
) {
  const deletedMaterial = await deleteFieldOfCategoryMaterial(
    workspaceId,
    handbookId,
    fieldOfCategoryMaterialId
  );

  if (isEntityMaterialTypeGuard(deletedMaterial)) {
    return deletedMaterial;
  }
  return deletedMaterial;
}
