'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/utils/routes/paths';

import LandingIcon from '../landing-icon';
import { landingFinalCta, ACCESS_REQUEST_HREF } from '../landing-content';

export default function FinalCtaSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        // Градиент от primary.dark: белый текст на primary.main даёт контраст ниже 4.5:1.
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.darker} 100%)`,
        color: 'common.white',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700, color: 'inherit' }}
          >
            {landingFinalCta.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: 'inherit', opacity: 0.9, fontSize: { xs: 16, md: 18 }, maxWidth: 640 }}
          >
            {landingFinalCta.subtitle}
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              href={ACCESS_REQUEST_HREF}
              variant="contained"
              size="large"
              endIcon={<LandingIcon icon="solar:letter-bold-duotone" />}
              sx={{
                px: 5,
                py: 1.5,
                fontSize: 16,
                bgcolor: 'common.white',
                color: 'primary.darker',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              {landingFinalCta.primaryCta}
            </Button>
            <Button
              component={NextLink}
              href={paths.auth.login}
              variant="outlined"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontSize: 16,
                color: 'common.white',
                borderColor: 'common.white',
                '&:hover': { borderColor: 'common.white', bgcolor: 'rgba(255,255,255,0.08)' },
              }}
            >
              {landingFinalCta.secondaryCta}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
