import React from 'react';
import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';

import { ForbiddenIllustration } from 'src/utils/assets/illustrations';

import { varBounce, MotionContainer } from 'src/shared/animate';

type ForbiddenProps = {
  sx?: SxProps<Theme>;
};

export function Forbidden({ sx }: ForbiddenProps) {
  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Запрет доступа
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          У вас нет доступа к данному контенту
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>
    </Container>
  );
}
