'use client';

import { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import { GuideScreenshot as GuideScreenshotType } from '../_types';

interface GuideScreenshotProps {
  screenshot: GuideScreenshotType;
}

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
            spacing={1}
            sx={{ position: 'absolute', inset: 0, color: 'text.disabled', p: 3 }}
          >
            <ImageNotSupportedOutlinedIcon sx={{ fontSize: 64 }} />
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Скриншот будет добавлен
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ textAlign: 'center' }}>
              {screenshot.alt}
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
