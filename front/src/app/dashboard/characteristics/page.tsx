import Characteristics from '@/widgets/characteristics/characteristics';

import { getAllUsers } from 'src/api/actions/user/get-all-users.action';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Characteristics',
};

export default async function Page() {
  const allCharacteristics = await getAllUsers();
  return <Characteristics />;
}
