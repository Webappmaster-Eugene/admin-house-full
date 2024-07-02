import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { bgBlur } from 'src/utils/theme/css';
import { NavData } from 'src/utils/const/data/nav-data';
import { UserRoles } from 'src/utils/const/user-roles.enum';

import Scrollbar from 'src/shared/scrollbar';
import { HEADER } from 'src/layouts/config-layout';
import HeaderShadow from 'src/shared/header-shadow';
import { CurrentUserInfo } from 'src/entities/auth/lib';
import { useCurrentUserStore } from 'src/store/auth/user-auth.store';
import NavSectionHorizontal from 'src/shared/nav-section/horizontal';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();

  const loginedUser: CurrentUserInfo = useCurrentUserStore((state) => state.user);

  return (
    <AppBar
      component="div"
      sx={{
        top: HEADER.H_DESKTOP_OFFSET,
      }}
    >
      <Toolbar
        sx={{
          ...bgBlur({
            color: theme.palette.background.default,
          }),
        }}
      >
        <Scrollbar
          sx={{
            '& .simplebar-content': {
              display: 'flex',
            },
          }}
        >
          <NavSectionHorizontal
            data={NavData}
            slotProps={{
              currentRole: loginedUser?.roleName as UserRoles,
            }}
            sx={{
              ...theme.mixins.toolbar,
            }}
          />
        </Scrollbar>
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
