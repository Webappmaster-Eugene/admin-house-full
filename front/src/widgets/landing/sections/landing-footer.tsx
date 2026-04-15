'use client';

import {
  Box,
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  IconButton,
} from '@mui/material';

import Logo from 'src/shared/logo';
import Iconify from 'src/shared/iconify';

import { landingAuthor, landingFooter } from '../landing-content';

const SOCIAL_TYPES = ['github', 'habr', 'youtube', 'telegram', 'website'] as const;

export default function LandingFooter() {
  const socials = landingAuthor.contacts.filter((c) =>
    (SOCIAL_TYPES as readonly string[]).includes(c.type)
  );

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Logo />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {landingFooter.copyright}
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }}>
              <Link href="#author" underline="hover" sx={{ color: 'text.secondary', typography: 'body2' }}>
                О разработчике
              </Link>
              <Link
                href="mailto:support@hhos.ru"
                underline="hover"
                sx={{ color: 'text.secondary', typography: 'body2' }}
              >
                {landingFooter.supportLabel}
              </Link>
              <Link
                href="mailto:johnn.hotmail@mail.ru"
                underline="hover"
                sx={{ color: 'text.secondary', typography: 'body2' }}
              >
                Связаться с автором
              </Link>
            </Stack>
          </Stack>

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Продукт разрабатывается {landingAuthor.name}. Открыт к сотрудничеству.
            </Typography>

            <Stack direction="row" spacing={0.5}>
              {socials.map((contact) => (
                <IconButton
                  key={contact.type}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={contact.label}
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <Iconify icon={contact.icon} width={20} />
                </IconButton>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
