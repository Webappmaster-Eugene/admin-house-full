'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/utils/routes/paths';

import Logo from 'src/shared/logo';

import { HOW_IT_WORKS_ID } from '../landing-content';

export default function LandingHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        backdropFilter: 'blur(8px)',
        backgroundColor: (theme) => `${theme.palette.background.default}cc`,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ minHeight: 64, py: 1 }}
        >
          <Logo showText />

          <Stack direction="row" spacing={3} alignItems="center">
            <Link
              href={`#${HOW_IT_WORKS_ID}`}
              underline="hover"
              sx={{
                display: { xs: 'none', sm: 'inline' },
                color: 'text.primary',
                typography: 'body2',
                fontWeight: 600,
              }}
            >
              Как это работает
            </Link>

            <Button
              component={NextLink}
              href={paths.auth.login}
              variant="contained"
              color="primary"
              size="medium"
            >
              Войти
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
