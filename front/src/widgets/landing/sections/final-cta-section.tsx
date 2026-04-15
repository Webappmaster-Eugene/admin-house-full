'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/utils/routes/paths';

import Iconify from 'src/shared/iconify';

import { landingFinalCta } from '../landing-content';

export default function FinalCtaSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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

          <Button
            component={NextLink}
            href={paths.auth.login}
            variant="contained"
            color="inherit"
            size="large"
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{
              mt: 2,
              px: 5,
              py: 1.5,
              fontSize: 16,
              backgroundColor: 'common.white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            {landingFinalCta.ctaLabel}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
