import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { bgBlur } from 'src/utils/theme/css';
import { useOffSetTop } from 'src/utils/hooks/use-off-set-top';
import { useResponsive } from 'src/utils/hooks/use-responsive';

import SettingsButton from 'src/shared/settings-button';
import { NAV, HEADER } from 'src/layouts/config-layout';
import { useSettingsContext } from 'src/shared/settings';
import AccountPopover from 'src/features/account-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  // const isNavHorizontal = settings.themeLayout === 'horizontal';

  // const isNavMini = settings.themeLayout === 'mini' || settings.themeLayout === 'vertical';

  const isMediaMoreThanLg = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  // const offsetTop = offset && !isNavHorizontal;

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
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          // ...(offsetTop && {
          //   height: HEADER.H_DESKTOP_OFFSET,
        }),
        // ...(isNavMini && {
        //   width: `calc(100% - ${NAV.W_MINI + 1}px)`,
        // }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {/* {!isMediaMoreThanLg && ( */}
        {/*  // <IconButton onClick={onOpenNav}> */}
        {/*  <IconButton> */}
        {/*    <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" /> */}
        {/*  </IconButton> */}
        {/* )} */}

        {/* <Searchbar /> */}

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1 }}
        >
          {/* <LanguagePopover /> */}

          {/* <NotificationsPopover /> */}

          {/* <ContactsPopover /> */}

          <SettingsButton />

          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
