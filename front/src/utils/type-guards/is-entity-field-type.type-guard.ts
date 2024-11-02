import {
  FieldTypeGetCommand,
  FieldTypeDeleteCommand,
  FieldTypeUpdateCommand,
  FieldTypeCreateCommand,
} from '@numart/house-admin-contracts';

export function isEntityFieldTypeTypeGuard(
  entity: unknown
): entity is
  | FieldTypeGetCommand.ResponseEntity
  | FieldTypeCreateCommand.ResponseEntity
  | FieldTypeUpdateCommand.ResponseEntity
  | FieldTypeDeleteCommand.ResponseEntity {
  if (
    entity &&
    typeof entity === 'object' &&
    'name' in entity &&
    'uuid' in entity &&
    'jsType' in entity
  ) {
    return true;
  }
  return false;
}
