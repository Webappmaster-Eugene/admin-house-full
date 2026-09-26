import { useTheme } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import { bgBlur } from 'src/utils/theme/css';
import { useResponsive } from 'src/utils/hooks/use-responsive';

import Iconify from 'src/shared/iconify';
import { NAV } from 'src/layouts/config-layout';
import { useSettingsContext } from 'src/shared/settings';

// ----------------------------------------------------------------------

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  if (!lgUp) {
    return null;
  }

  const isVertical = settings.themeLayout === 'vertical';

  return (
    <IconButton
      size="small"
      // Кнопка только с иконкой — без подписи скринридер её не озвучит.
      aria-label={isVertical ? 'Свернуть меню' : 'Развернуть меню'}
      onClick={() => settings.onUpdate('themeLayout', isVertical ? 'mini' : 'vertical')}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: NAV.W_VERTICAL - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={isVertical ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </IconButton>
  );
}
