'use client';

import { m } from 'framer-motion';
import { RouterLink } from '@/shared/router-link';
import { varBounce, MotionContainer } from '@/shared/animate';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { PageNotFoundIllustration } from 'src/utils/assets/illustrations';

import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <CompactLayout>
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Извините, страница не найдена!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Извините, мы не смогли найти страницу, которую вы ищете. Возможно, вы неправильно ввели
            URL-адрес? Обязательно проверьте правильность URL-адреса.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          На главную
        </Button>
      </MotionContainer>
    </CompactLayout>
  );
}
