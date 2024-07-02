'use client';

import Logo from '@/shared/logo';
import { useEffect } from 'react';
import Scrollbar from '@/shared/scrollbar';
import { NAV } from '@/layouts/config-layout';
import NavLeftBottom from '@/shared/nav-left-bottom';
import { NavData } from '@/utils/const/data/nav-data';
import { CurrentUserInfo } from '@/entities/auth/lib';
import NavToggleButton from '@/shared/nav-toggle-button';
import { UserRoles } from '@/utils/const/user-roles.enum';
import { useCurrentUserStore } from '@/store/auth/user-auth.store';
import { usePathname } from '@/utils/hooks/router-hooks/use-pathname';
import { NavVerticalProps } from '@/layouts/dashboard/nav-vertical/nav-vertical.props';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import NavMenuVertical from 'src/shared/nav-section/vertical';
// ---------------------------------------------------------------------

export default function NavVertical({ isOpenedNav, onCloseNav }: NavVerticalProps) {
  const loginedUser: CurrentUserInfo = useCurrentUserStore((state) => state.user);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpenedNav) {
      onCloseNav();
    }
  }, [onCloseNav, isOpenedNav, pathname]);

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      <Stack
        sx={{
          height: 1,
          position: 'fixed',
          width: NAV.W_VERTICAL,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Logo sx={{ mt: 3, ml: 4, mb: 1 }} />

          <NavMenuVertical
            data={NavData}
            slotProps={{
              currentRole: loginedUser?.roleName as UserRoles,
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <NavLeftBottom />
        </Scrollbar>
      </Stack>
    </Box>
  );
}
