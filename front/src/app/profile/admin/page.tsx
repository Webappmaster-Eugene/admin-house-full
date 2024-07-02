import AdminView from '@/widgets/admin/admin-view';

import { UserRoles } from 'src/utils/const/user-roles.enum';

import { RoleBasedGuard } from 'src/entities/auth/guard';

export const metadata = {
  title: 'Profile: admin-part',
};

export default async function AdminPage() {
  return (
    <RoleBasedGuard rolesWithAccess={[UserRoles.ADMIN]}>
      <AdminView />
    </RoleBasedGuard>
  );
}
