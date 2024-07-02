'use client';

import { useSettingsContext } from '@/shared/settings';

import Box from '@mui/material/Box';

import { PropsReactNode } from 'src/utils/types';
import { useBoolean } from 'src/utils/hooks/use-boolean';
import { useResponsive } from 'src/utils/hooks/use-responsive';

import Main from 'src/layouts/dashboard/main';
import Header from 'src/layouts/dashboard/header/header';
import NavMini from 'src/layouts/dashboard/nav-mini/nav-mini';
import NavVertical from 'src/layouts/dashboard/nav-vertical/nav-vertical';

// ----------------------------------------------------------------------

export default function DashboardGeneralLayout({ children }: PropsReactNode) {
  const settings = useSettingsContext();

  const isNavOpened = useBoolean();

  // const isHorizontal = settings.themeLayout === 'horizontal';

  const isMiniVisible = settings.themeLayout === 'mini';
  const isVerticalVisible = settings.themeLayout === 'vertical';
  const isMediaMoreThanLg = useResponsive('up', 'lg');

  return (
    <>
      <Header onOpenNav={isNavOpened.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {isVerticalVisible && (
          <NavVertical isOpenedNav={isNavOpened.value} onCloseNav={isNavOpened.onFalse} />
        )}

        {isMiniVisible && <NavMini />}

        <Main>{children}</Main>
      </Box>
    </>
  );
}
