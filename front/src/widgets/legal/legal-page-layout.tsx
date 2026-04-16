'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/shared/iconify';

// ----------------------------------------------------------------------

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md" sx={{ flex: 1, py: { xs: 3, md: 5 } }}>
        <Stack spacing={4}>
          <Box>
            <Button
              component={NextLink}
              href="/"
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
              sx={{ mb: 2, color: 'text.secondary' }}
            >
              На главную
            </Button>

            <Typography variant="h3" component="h1" gutterBottom>
              {title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              Последнее обновление: {lastUpdated}
            </Typography>
          </Box>

          <Box
            sx={{
              '& > *:last-child': { mb: 0 },
            }}
          >
            {children}
          </Box>

          <Box
            component="footer"
            sx={{
              pt: 4,
              mt: 2,
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              По всем вопросам обращайтесь:{' '}
              <Typography
                component="a"
                href="mailto:support@hhos.ru"
                variant="body2"
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                support@hhos.ru
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
