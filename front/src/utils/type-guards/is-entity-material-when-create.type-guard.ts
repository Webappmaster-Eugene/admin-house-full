import { MaterialCreateCommand } from '@numart/house-admin-contracts';

export function isEntityMaterialTG(
  entity: unknown
): entity is MaterialCreateCommand.ResponseEntity {
  if (
    entity &&
    typeof entity === 'object' &&
    'name' in entity &&
    'uuid' in entity &&
    'categoryMaterialUuid' in entity &&
    'unitMeasurementUuid' in entity &&
    'price' in entity
  ) {
    return true;
  }
  return false;
}
