import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

export function isEntityCategoryMaterialTG(
  entity: unknown
): entity is CategoryMaterialGetCommand.ResponseEntity {
  if (
    entity &&
    typeof entity === 'object' &&
    'name' in entity &&
    'uuid' in entity &&
    'globalCategoryMaterialUuid' in entity
  ) {
    return true;
  }
  return false;
}
