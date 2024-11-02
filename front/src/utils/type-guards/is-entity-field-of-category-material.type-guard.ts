import {
  FieldOfCategoryMaterialGetCommand,
  FieldOfCategoryMaterialCreateCommand,
  FieldOfCategoryMaterialUpdateCommand,
} from '@numart/house-admin-contracts';

export function isEntityFieldOfCategoryMaterialTypeGuard(
  entity: unknown
): entity is
  | FieldOfCategoryMaterialGetCommand.ResponseEntity
  | FieldOfCategoryMaterialCreateCommand.ResponseEntity
  | FieldOfCategoryMaterialUpdateCommand.ResponseEntity {
  if (
    entity &&
    typeof entity === 'object' &&
    'name' in entity &&
    'uuid' in entity &&
    'isRequired' in entity &&
    'unitOfMeasurementUuid' in entity &&
    'handbookUuid' in entity &&
    'fieldTypeUuid' in entity
  ) {
    return true;
  }
  return false;
}
