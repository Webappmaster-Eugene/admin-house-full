'use client';

import { m } from 'framer-motion';
import { varBounce, MotionContainer } from '@/shared/animate';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';

import { UserRoles } from 'src/utils/const/user-roles.enum';
import { ForbiddenIllustration } from 'src/utils/assets/illustrations';

import { useCurrentUserStore } from 'src/store/auth/user-auth.store';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  children: React.ReactNode;
  hasContent?: boolean;
  rolesWithAccess?: UserRoles[];
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({
  hasContent,
  rolesWithAccess,
  children,
  sx,
}: RoleBasedGuardProp) {
  const currentUser = useCurrentUserStore((state) => state.user);
  const currentUserRole = currentUser && (currentUser.roleName as UserRoles);

  if (
    rolesWithAccess &&
    rolesWithAccess?.length &&
    currentUserRole &&
    rolesWithAccess.includes(currentUserRole)
  ) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
