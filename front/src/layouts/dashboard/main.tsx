'use client';

import { useSettingsContext } from '@/shared/settings';

import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/utils/hooks/use-responsive';

import { NAV, HEADER } from '../config-layout';

export default function Main({ children, sx, ...other }: BoxProps) {
  const SPACING = 12;

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

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
        // На широком экране шапка выше (H_DESKTOP) — без этого верх контента уходил под неё
        ...(lgUp && { pt: `${HEADER.H_DESKTOP + SPACING}px` }),
        px: 2,
        // Ниже lg меню выезжает поверх страницы и места не занимает
        width: '100%',
        ...(lgUp && {
          width: `calc(100% - ${isNavVertical ? NAV.W_VERTICAL : NAV.W_MINI}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
