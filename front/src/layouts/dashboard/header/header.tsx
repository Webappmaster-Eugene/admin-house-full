import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { bgBlur } from 'src/utils/theme/css';
import { useResponsive } from 'src/utils/hooks/use-responsive';

import SettingsButton from 'src/shared/settings-button';
import { NAV, HEADER } from 'src/layouts/config-layout';
import AccountPopover from 'src/features/account-popover';
import { useSettingsContext } from 'src/shared/settings/context';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const isMediaMoreThanLg = useResponsive('up', 'lg');

  const settings = useSettingsContext();

  // Шапка начинается там, где заканчивается меню: в мини-режиме оно 88px, а не 280px
  const navWidth = settings.themeLayout === 'mini' ? NAV.W_MINI : NAV.W_VERTICAL;

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isMediaMoreThanLg && {
          width: `calc(100% - ${navWidth + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {!isMediaMoreThanLg && onOpenNav && (
          <IconButton onClick={onOpenNav} aria-label="Открыть меню" sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1 }}
        >
          <SettingsButton />

          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
