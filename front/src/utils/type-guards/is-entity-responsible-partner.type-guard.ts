import { ResponsiblePartnerProducerGetCommand } from '@numart/house-admin-contracts';

export function isEntityResponsiblePartnerTG(
  entity: unknown
): entity is ResponsiblePartnerProducerGetCommand.ResponseEntity {
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
