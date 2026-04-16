'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/shared/iconify';

import { landingTargetAudiences } from '../landing-content';

export default function TargetAudienceSection() {
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
            Для кого
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, fontWeight: 700 }}>
            Для кого SMETAS
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Платформа подходит всем участникам строительного процесса — от сметчиков до руководителей
            компаний.
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
          {landingTargetAudiences.map((audience) => (
            <Card
              key={audience.title}
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
                  <Iconify icon={audience.icon} width={32} />
                </Box>

                <Typography component="h3" variant="h6" sx={{ fontWeight: 700 }}>
                  {audience.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {audience.description}
                </Typography>

                <Stack spacing={1} sx={{ mt: 1 }}>
                  {audience.useCases.map((useCase) => (
                    <Stack key={useCase} direction="row" spacing={1} alignItems="flex-start">
                      <Iconify
                        icon="solar:check-circle-bold"
                        width={18}
                        sx={{ color: 'success.main', mt: 0.25, flexShrink: 0 }}
                      />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {useCase}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
