import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Цвет акцентного текста на светлом/тёмном фоне. primary.main (#00A76F) на белом даёт контраст 3.1:1 —
 * мало для мелкого текста (WCAG AA требует 4.5:1), поэтому берём более тёмный/светлый оттенок.
 */
export const accentTextColor = (theme: Theme) =>
  theme.palette.mode === 'light' ? theme.palette.primary.dark : theme.palette.primary.light;

/** Надпись-рубрика над заголовком секции («ЭКОНОМИЯ», «ПРЕИМУЩЕСТВА»...). */
export const sectionOverlineSx: SxProps<Theme> = {
  color: accentTextColor,
  letterSpacing: 1.5,
  fontWeight: 700,
};
