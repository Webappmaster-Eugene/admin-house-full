import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

export function isCurrentUserType(user: unknown): user is UserGetFullInfoCommand.ResponseEntity {
  if (user && typeof user === 'object' && 'uuid' in user) {
    return true;
  }
  return false;
}
