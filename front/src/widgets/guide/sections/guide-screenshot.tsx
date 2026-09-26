'use client';

import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { GuideScreenshot as GuideScreenshotType } from '../_types';

interface GuideScreenshotProps {
  screenshot: GuideScreenshotType;
}

/**
 * Отображает скриншот руководства.
 *
 * Если PNG отсутствует в `public/assets/onboarding/` — компонент вообще ничего не рендерит
 * (возвращает `null`). Никаких «Скриншот будет добавлен» — описание из `alt/caption`
 * уже встроено в родительский `GuideDetailBlock`/секцию, поэтому placeholder — шум.
 *
 * Когда реальные PNG будут положены, они автоматически появятся без изменений в коде.
 */
export function GuideScreenshot({ screenshot }: GuideScreenshotProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Box
      sx={{
        mt: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.neutral',
      }}
    >
      {/* Ссылка на кадр в полном размере: на телефоне миниатюра интерфейса нечитаема */}
      <Box
        component="a"
        href={screenshot.src}
        target="_blank"
        rel="noopener"
        aria-label={`${screenshot.alt} — открыть в полном размере`}
        sx={{
          display: 'block',
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          cursor: 'zoom-in',
        }}
      >
        <Box
          component="img"
          src={screenshot.src}
          alt={screenshot.alt}
          // В руководстве два десятка PNG: без lazy страница ждала загрузки ~2,5 МБ картинок
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', textAlign: 'center', py: 1, px: 2 }}
      >
        {screenshot.caption}
      </Typography>
    </Box>
  );
}
