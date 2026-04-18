'use client';

import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

import { GuideScreenshot as GuideScreenshotType } from '../_types';

interface GuideScreenshotProps {
  screenshot: GuideScreenshotType;
}

/**
 * Отображает скриншот с graceful fallback, если PNG отсутствует.
 *
 * Fallback — аккуратная иллюстративная карточка с описанием (alt) и подписью (caption),
 * а не "битая картинка". Это позволяет держать руководство связным и до момента,
 * когда реальные скриншоты будут сняты и положены в public/assets/onboarding/.
 */
export function GuideScreenshot({ screenshot }: GuideScreenshotProps) {
  const [failed, setFailed] = useState(false);

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
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
        {failed ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
            sx={{
              position: 'absolute',
              inset: 0,
              p: 3,
              background:
                'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
            }}
          >
            <InsertPhotoOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.65 }} />
            <Typography
              variant="subtitle2"
              sx={{ textAlign: 'center', color: 'text.primary', maxWidth: 480 }}
            >
              {screenshot.alt}
            </Typography>
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{ textAlign: 'center', fontStyle: 'italic' }}
            >
              Иллюстрация — скриншот будет добавлен после снятия с live-стенда
            </Typography>
          </Stack>
        ) : (
          <Box
            component="img"
            src={screenshot.src}
            alt={screenshot.alt}
            onError={() => setFailed(true)}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
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
