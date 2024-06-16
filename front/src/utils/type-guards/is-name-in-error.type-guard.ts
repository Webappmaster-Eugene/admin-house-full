import { ErrorDescriptionType } from 'src/utils/types/error-description.type';

export function isNameInErrorTypeGuard(error: unknown): error is ErrorDescriptionType {
  if (error && typeof error === 'object' && 'name' in error && 'description' in error) {
    return true;
  }
  return false;
}
