// ----------------------------------------------------------------------

import AdminView from '@/widgets/admin/admin-view';

import { UserRoles } from 'src/utils/const/user-roles.enum';

import { RoleBasedGuard } from 'src/entities/auth/guard';

export const metadata = {
  title: 'Profile: admin-part',
};

export default function AdminPage() {
  // let allUsers = await getAllUsers();
  // if (!isErrorFieldTypeGuard(allUsers)) {
  //   allUsers = allUsers as UserGetAllCommand.ResponseEntity;
  // }

  return (
    <RoleBasedGuard hasContent rolesWithAccess={[UserRoles.ADMIN]}>
      <AdminView />
    </RoleBasedGuard>
  );
}
