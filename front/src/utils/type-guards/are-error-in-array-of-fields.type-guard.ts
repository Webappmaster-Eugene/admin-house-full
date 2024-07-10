import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';

export function isErrorInArrayFieldTypeGuard(
  entities: unknown[]
): entities is Array<ErrorFromBackend> {
  if (entities && Array.isArray(entities)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const entity of entities) {
      if (entity && typeof entity === 'object' && 'error' in entity) {
        return true;
      }
    }
  }
  return false;
}
