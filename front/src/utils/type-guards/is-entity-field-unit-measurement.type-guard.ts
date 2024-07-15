import { FieldUnitMeasurementGetCommand } from '@numart/house-admin-contracts';

export function isEntityFieldUnitMeasurementTG(
  entity: unknown
): entity is FieldUnitMeasurementGetCommand.ResponseEntity {
  if (
    entity &&
    typeof entity === 'object' &&
    'name' in entity &&
    'uuid' in entity &&
    'handbookUuid' in entity
  ) {
    return true;
  }
  return false;
}
