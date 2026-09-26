import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Цвет акцентного текста на светлом/тёмном фоне. primary.main (#00A76F) на белом даёт контраст 3.1:1 —
 * мало для мелкого текста (WCAG AA требует 4.5:1), поэтому берём более тёмный/светлый оттенок.
 */
export const accentTextColor = (theme: Theme) =>
  theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light;

/** Надпись-рубрика над заголовком секции («ЗАЧЕМ ЭТО НУЖНО», «КАК ЭТО РАБОТАЕТ»...). */
export const sectionOverlineSx: SxProps<Theme> = {
  color: accentTextColor,
  letterSpacing: 1.5,
  fontWeight: 700,
};

/**
 * Текст только для скринридеров. Размеры строками: в sx число 1 означает 100%, а m: -1 — отступ темы.
 * Без функций — можно использовать в серверных компонентах.
 */
export const visuallyHiddenSx = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: 0,
  m: '-1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
} as const;
