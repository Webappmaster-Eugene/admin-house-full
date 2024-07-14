import { UserGetFullInfoCommand } from '@/../../back/libs/contracts';

import { UserRoles } from 'src/utils/const/user-roles.enum';

export function isUserWithRelatedWorkspaceTG(user: UserGetFullInfoCommand.ResponseEntity): boolean {
  if (
    'role' in user &&
    (user.role.name === UserRoles.MANAGER || user.role.name === UserRoles.WORKER)
  ) {
    return true;
  }
  return false;
}
