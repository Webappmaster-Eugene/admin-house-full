import { JSX } from 'react';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { paths } from 'src/shared/routes/paths';
import { RouterLink } from 'src/shared/components';

export function LoginHead(): JSX.Element {
  return (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Войти в House Admin</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Нет аккаунта?</Typography>

        <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
          Зарегистрироваться
        </Link>
      </Stack>
    </Stack>
  );
}
