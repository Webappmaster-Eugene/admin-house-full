import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';

export function isErrorFieldTypeGuard(entity: unknown): entity is ErrorFromBackend {
  if (entity && typeof entity === 'object' && 'error' in entity) {
    return true;
  }
  return false;
}
