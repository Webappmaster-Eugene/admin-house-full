'use client';

import { useSettingsContext } from '@/shared/settings';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function SettingsView() {
  const settings = useSettingsContext();

  return (
    // <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Container maxWidth="xl">
      <Typography variant="h4"> Page Six </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
