import { FieldUnitMeasurementGetCommand } from '@/../../back/libs/contracts';

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
