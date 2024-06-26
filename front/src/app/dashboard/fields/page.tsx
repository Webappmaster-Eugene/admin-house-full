import Fields from '@/widgets/fields/fields';

import { getAllUsers } from 'src/api/actions/user/get-all-users.action';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Fields',
};

export default async function Page() {
  const allUsers = await getAllUsers();
  return <Fields />;
}
