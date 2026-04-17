'use client';

import NextLink from 'next/link';

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

const FOOTER_CONTACT_TYPES = ['telegram', 'email', 'phone', 'website'] as const;

const LEGAL_LINKS = [
  { label: 'Пользовательское соглашение', href: '/terms' },
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Публичная оферта', href: '/offer' },
  { label: 'Cookies', href: '/cookies' },
] as const;

export default function LandingFooter() {
  const contacts = landingAuthor.contacts.filter((c) =>
    (FOOTER_CONTACT_TYPES as readonly string[]).includes(c.type)
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
              <Logo showText />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {landingFooter.copyright}
              </Typography>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }}>
              <Link
                href="mailto:support@hhos.ru"
                underline="hover"
                sx={{ color: 'text.secondary', typography: 'body2' }}
              >
                {landingFooter.supportLabel}
              </Link>
              <Link
                href={`mailto:${landingAuthor.contacts.find((c) => c.type === 'email')?.value}`}
                underline="hover"
                sx={{ color: 'text.secondary', typography: 'body2' }}
              >
                Контакты
              </Link>
            </Stack>
          </Stack>

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            flexWrap="wrap"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                component={NextLink}
                href={link.href}
                underline="hover"
                sx={{ color: 'text.disabled', typography: 'caption' }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.5} justifyContent="flex-end">
            {contacts.map((contact) => (
              <IconButton
                key={contact.type}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={contact.label}
                size="small"
                sx={{ color: 'text.secondary' }}
              >
                <Iconify icon={contact.icon} width={20} />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
