'use client';

import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/utils/routes/paths';

import Logo from 'src/shared/logo';

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
      </Container>
    </Box>
  );
}
