'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { sectionOverlineSx } from './landing-styles';

// ----------------------------------------------------------------------

interface SectionHeadingProps {
  overline: string;
  title: string;
  subtitle?: string;
  /** id заголовка — для aria-labelledby секции. */
  id?: string;
}

/**
 * Заголовок секции лендинга: рубрика, h2 и подзаголовок.
 * Клиентский компонент — цвет рубрики зависит от темы (функция в sx), а секции-серверные компоненты
 * не могут передавать функции в клиентские компоненты.
 */
export default function SectionHeading({ overline, title, subtitle, id }: SectionHeadingProps) {
  return (
    <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 8 } }}>
      <Typography variant="overline" sx={sectionOverlineSx}>
        {overline}
      </Typography>
      <Typography id={id} variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
