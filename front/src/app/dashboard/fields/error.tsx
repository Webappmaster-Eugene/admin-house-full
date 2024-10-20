'use client';

// Error components must be Client Components

import { m } from 'framer-motion';
import React, { useEffect } from 'react';
import { varBounce, MotionContainer } from '@/shared/animate';
import { SeverErrorIllustration } from '@/utils/assets/illustrations';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Ошибка запроса к серверу
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          К сожалению, произошла ошибка, пожалуйста, обратитесь к администратору!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Обновить страницу
        </Button>
      </m.div>
    </Container>
  );
}
