'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/utils/routes/paths';

import Iconify from 'src/shared/iconify';

import { landingHero } from '../landing-content';

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 14 },
        background: (theme) =>
          `linear-gradient(180deg, ${theme.palette.primary.lighter} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          textAlign="center"
          sx={{ maxWidth: 880, mx: 'auto' }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 36, sm: 48, md: 64 },
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            {landingHero.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: 16, md: 20 },
            }}
          >
            {landingHero.subtitle}
          </Typography>

          <Button
            component={NextLink}
            href={paths.auth.login}
            variant="contained"
            color="primary"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{ mt: { xs: 2, md: 3 }, px: 5, py: 1.5, fontSize: 16 }}
          >
            {landingHero.ctaLabel}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
