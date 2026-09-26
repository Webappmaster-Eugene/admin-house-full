import Box, { BoxProps } from '@mui/material/Box';

// Только тип: данные иконок (landing-icons.ts) не должны попадать в клиентский JS — они выводятся
// один раз в HTML серверным компонентом LandingIconSprite.
import type { LandingIconName } from './landing-icons';

// ----------------------------------------------------------------------

/** id элемента <symbol> в спрайте. Двоеточие из имени Iconify заменяем, чтобы id был простым. */
export const landingIconSymbolId = (icon: LandingIconName) =>
  `landing-icon-${icon.replace(':', '-')}`;

interface LandingIconProps extends Omit<BoxProps<'svg'>, 'children'> {
  icon: LandingIconName;
  width?: number;
}

/**
 * Иконка лендинга — ссылка <use> на символ из спрайта (landing-icon-sprite.tsx).
 * Рисуется уже в HTML при серверном рендере. Iconify (@iconify/react 4) рисует иконку только после
 * гидрации и загружает её с api.iconify.design — на лендинге это давало пустые места до загрузки JS
 * и 26 внешних запросов. Цвет наследуется через currentColor.
 */
export default function LandingIcon({ icon, width = 20, sx, ...other }: LandingIconProps) {
  return (
    <Box
      component="svg"
      aria-hidden
      focusable="false"
      // Массив — рекомендованный MUI способ объединить sx: переданный sx может быть объектом, функцией или массивом.
      sx={[{ width, height: width, flexShrink: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <use href={`#${landingIconSymbolId(icon)}`} />
    </Box>
  );
}
