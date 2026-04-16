'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/utils/routes/paths';

import Iconify from 'src/shared/iconify';

import { landingPricing } from '../landing-content';

export default function PricingSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 1.5, fontWeight: 700 }}
          >
            Тарифы
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            {landingPricing.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520 }}>
            {landingPricing.subtitle}
          </Typography>
        </Stack>

        <Card
          sx={{
            p: { xs: 4, md: 5 },
            textAlign: 'center',
            borderRadius: 3,
            boxShadow: (theme) => theme.customShadows.z16,
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}
          >
            {landingPricing.price}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            Полный доступ без ограничений по времени
          </Typography>

          <Stack spacing={1.5} sx={{ mb: 4, textAlign: 'left', maxWidth: 320, mx: 'auto' }}>
            {landingPricing.features.map((feature) => (
              <Stack key={feature} direction="row" spacing={1.5} alignItems="center">
                <Iconify
                  icon="solar:check-circle-bold"
                  width={20}
                  sx={{ color: 'success.main', flexShrink: 0 }}
                />
                <Typography variant="body2">{feature}</Typography>
              </Stack>
            ))}
          </Stack>

          <Button
            component={NextLink}
            href={paths.auth.login}
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            endIcon={<Iconify icon="solar:arrow-right-linear" />}
            sx={{ py: 1.5, fontSize: 16 }}
          >
            {landingPricing.ctaLabel}
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
