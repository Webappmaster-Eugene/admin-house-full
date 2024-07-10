import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { hideScroll } from 'src/utils/theme/css';
import { NavData } from 'src/utils/const/data/nav-data';
import { UserRoles } from 'src/utils/const/user-roles.enum';

import Logo from 'src/shared/logo';
import { NAV } from 'src/layouts/config-layout';
import { CurrentUserInfo } from 'src/entities/auth/lib';
import NavSectionMini from 'src/shared/nav-section/mini';
import NavToggleButton from 'src/shared/nav-toggle-button';
import { useCurrentUserStore } from 'src/store/auth/user-auth.store';

// ----------------------------------------------------------------------

export default function NavMini() {
  const loginedUser: CurrentUserInfo = useCurrentUserStore((state) => state.user);
  const themeState = useTheme();

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: NAV.W_MINI,
        zIndex: themeState.zIndex.appBar + 1,
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2 }} />

        <NavSectionMini
          data={NavData}
          slotProps={{
            currentRole: loginedUser?.role.name as UserRoles,
          }}
        />
      </Stack>
    </Box>
  );
}
