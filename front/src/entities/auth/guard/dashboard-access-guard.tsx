import { redirect } from 'next/navigation';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { paths } from 'src/utils/routes/paths';
import { PropsReactNode } from 'src/utils/types';
import { UserRoles } from 'src/utils/const/user-roles.enum';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';

export default async function DashboardAccessGuard({ children }: PropsReactNode) {
  const currentUser = await getCurrentUser();

  if (!currentUser || isErrorFieldTypeGuard(currentUser)) {
    return <>{children}</>;
  }

  const user = currentUser as UserGetFullInfoCommand.ResponseEntity;
  const userRole = user.roles?.[0]?.name as UserRoles | undefined;

  if (userRole === UserRoles.ADMIN) {
    redirect(paths.profile.admin);
  }

  if (userRole === UserRoles.WORKER || userRole === UserRoles.CUSTOMER) {
    redirect(paths.profile.profile);
  }

  return <>{children}</>;
}
