'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/shared/iconify';

import { landingFeatures } from '../landing-content';

export default function FeaturesSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 1.5, fontWeight: 700 }}
          >
            Возможности системы
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            Всё необходимое для работы со сметами
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            От справочников материалов до интеграций — система покрывает весь жизненный цикл
            работы со сметами в строительстве.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
            },
          }}
        >
          {landingFeatures.map((feature) => (
            <Stack
              key={feature.title}
              direction="row"
              spacing={2.5}
              alignItems="flex-start"
              sx={{ p: { xs: 2, md: 3 } }}
            >
              <Box
                sx={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'background.paper',
                  color: 'primary.main',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <Iconify icon={feature.icon} width={26} />
              </Box>

              <Stack spacing={0.75}>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
