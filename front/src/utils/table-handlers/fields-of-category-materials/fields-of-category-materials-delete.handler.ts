import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { deleteMaterial } from 'src/api/actions/material/delete-material.action';

export async function fieldsOfCategoryMaterialsDeleteHandler(
  material: TMaterialTableEntity,
  workspaceId: string,
  handbookId: string,
  categoryMaterials: CategoryMaterialGetAllCommand.ResponseEntity
) {
  const categoryMaterialUuid = categoryMaterials?.find((categoryMaterial) => {
    const categoryMaterialName =
      typeof material.categoryMaterial === 'string'
        ? material.categoryMaterial
        : material.categoryMaterial?.name;
    return categoryMaterial.name === categoryMaterialName;
  })!.uuid;

  const deletedMaterial = await deleteMaterial(
    workspaceId,
    handbookId,
    categoryMaterialUuid,
    material.uuid
  );
}
