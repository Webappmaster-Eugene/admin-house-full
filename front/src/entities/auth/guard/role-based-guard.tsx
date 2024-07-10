'use client';

import { Theme, SxProps } from '@mui/material/styles';

import { UserRoles } from 'src/utils/const/user-roles.enum';

import { Forbidden } from 'src/shared/forbidden/forbidden';
import { useCurrentUserStore } from 'src/store/auth/user-auth.store';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  children: React.ReactNode;
  rolesWithAccess: UserRoles[];
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ rolesWithAccess, children, sx }: RoleBasedGuardProp) {
  const currentUser = useCurrentUserStore((state) => state.user);
  const currentUserRole = currentUser && (currentUser.role.name as UserRoles);

  if (rolesWithAccess.length && currentUserRole && rolesWithAccess.includes(currentUserRole)) {
    return <> {children} </>;
  }

  return <Forbidden sx={sx} />;
}
