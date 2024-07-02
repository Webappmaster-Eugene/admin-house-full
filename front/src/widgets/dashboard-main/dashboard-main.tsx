'use client';

import { useSettingsContext } from '@/shared/settings';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function DashboardMain() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Дашборд </Typography>
    </Container>
  );
}
