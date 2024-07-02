import { redirect } from 'next/navigation';

import { paths } from 'src/utils/routes/paths';
import { PropsReactNode } from 'src/utils/types';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';

export default async function GuestGuard({ children }: PropsReactNode) {
  const currentUser = await getCurrentUser();

  if (currentUser && !isErrorFieldTypeGuard(currentUser)) {
    redirect(paths.dashboard.root);
  }

  return <>{children}</>;
}
