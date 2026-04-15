import SettingsView from '@/widgets/settings/settings-view';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { Error } from 'src/shared/error/error';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';

export const metadata = {
  title: 'Настройки',
};

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (isErrorFieldTypeGuard(currentUser)) {
    return <Error />;
  }

  return <SettingsView currentUser={currentUser as UserGetFullInfoCommand.ResponseEntity} />;
}
