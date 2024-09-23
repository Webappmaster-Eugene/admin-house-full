import { useSettingsContext } from '@/shared/settings';

import Box, { BoxProps } from '@mui/material/Box';

import { useResponsive } from 'src/utils/hooks/use-responsive';

import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';

import { NAV, HEADER } from '../config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  // const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavVertical = settings.themeLayout === 'vertical';

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        // py: `${HEADER.H_MOBILE + SPACING}px`,
        px: 2,
        py: `${HEADER.H_DESKTOP + SPACING}px`,
        ml: lgUp ? 0 : `88px`,
        width: `calc(100% - ${NAV.W_MINI}px)`,
        ...(isNavVertical && {
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      <CustomBreadcrumbs
        // heading="Carousel"
        sx={{
          paddingLeft: 3,
          paddingRight: 3,
          marginBottom: 2,
        }}
        // links={[
        //   {
        //     name: 'Дашборд',
        //     href: paths.dashboard.root,
        //   },
        //   { name: `${pathname}` },
        // ]}
        // moreLink={['https://react-slick.neostack.com']}
      />
      {children}
    </Box>
  );
}
