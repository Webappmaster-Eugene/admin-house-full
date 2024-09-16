import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { UserRoles } from 'src/utils/const/user-roles.enum';

export function isUserWithRelatedWorkspaceTG(user: UserGetFullInfoCommand.ResponseEntity): boolean {
  if (
    'roles' in user &&
    user.roles &&
    (user.roles[0].name === UserRoles.MANAGER || user.roles[0].name === UserRoles.WORKER)
  ) {
    return true;
  }
  return false;
}
