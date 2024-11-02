import {
  MaterialGetCommand,
  MaterialCreateCommand,
  MaterialDeleteCommand,
  MaterialUpdateCommand,
} from '@numart/house-admin-contracts';

export function isEntityMaterialTypeGuard(
  entity: unknown
): entity is
  | MaterialGetCommand.ResponseEntity
  | MaterialCreateCommand.ResponseEntity
  | MaterialUpdateCommand.ResponseEntity
  | MaterialDeleteCommand.ResponseEntity {
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
