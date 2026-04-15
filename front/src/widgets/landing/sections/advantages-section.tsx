'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/shared/iconify';

import { landingAdvantages } from '../landing-content';

export default function AdvantagesSection() {
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
            Преимущества
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            Почему выбирают Сметы
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Современная платформа, которая решает реальные задачи строительных команд каждый день.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {landingAdvantages.map((advantage) => (
            <Card
              key={advantage.title}
              sx={{
                p: { xs: 3, md: 4 },
                height: '100%',
                boxShadow: (theme) => theme.customShadows.z8,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.customShadows.z16,
                },
              }}
            >
              <Stack spacing={2}>
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
                  <Iconify icon={advantage.icon} width={32} />
                </Box>

                <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                  {advantage.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {advantage.description}
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
