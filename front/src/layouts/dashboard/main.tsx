'use client';

import { useSettingsContext } from '@/shared/settings';

import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/utils/hooks/use-responsive';

import { NAV, HEADER } from '../config-layout';

export default function Main({ children, sx, ...other }: BoxProps) {
  const SPACING = 12;

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');
  // const { isScreenXxxl } = useResize();
  // const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavVertical = settings.themeLayout === 'vertical';

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignContent: 'flex-start',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        px: 2,
        ml: lgUp ? 0 : `88px`,
        width: `calc(100% - ${NAV.W_MINI}px)`,
        ...(isNavVertical && {
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {/* <CustomBreadcrumbs */}
      {/*  // heading="Carousel" */}
      {/*  sx={{ */}
      {/*    paddingLeft: 3, */}
      {/*    paddingRight: 3, */}
      {/*    mx: isScreenXxxl ? 'auto' : 0, */}
      {/*    marginBottom: 2, */}
      {/*    width: '100%', */}
      {/*    maxWidth: 'xl', */}
      {/*  }} */}
      {/* /> */}
      {children}
    </Box>
  );
}
