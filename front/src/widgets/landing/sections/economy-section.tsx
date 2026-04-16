'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/shared/iconify';

import { landingEconomy } from '../landing-content';

export default function EconomySection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', letterSpacing: 1.5, fontWeight: 700 }}
          >
            Экономия
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            Экономия времени и денег
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            SMETAS заменяет ручной труд автоматизацией — вы тратите меньше времени и допускаете
            меньше ошибок с первого проекта.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {landingEconomy.map((item) => (
            <Card
              key={item.metric}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
                textAlign: 'center',
                boxShadow: (theme) => theme.customShadows.z8,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.customShadows.z16,
                },
              }}
            >
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'primary.lighter',
                    color: 'primary.main',
                  }}
                >
                  <Iconify icon={item.icon} width={32} />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  {item.metric}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
