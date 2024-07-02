'use client';

import React from 'react';
import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Theme, SxProps } from '@mui/material/styles';

import { SeverErrorIllustration } from 'src/utils/assets/illustrations';

import { varBounce, MotionContainer } from 'src/shared/animate';

type ForbiddenProps = {
  sx?: SxProps<Theme>;
};

export function Error({ sx }: ForbiddenProps) {
  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Ошибка запроса
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          К сожалению, произошла ошибка, обратитесь к администратору
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>
    </Container>
  );
}
