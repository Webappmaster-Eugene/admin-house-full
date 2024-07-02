import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { PropsReactNode } from 'src/utils/types';

import Header from 'src/layouts/dashboard/header/header';

// ----------------------------------------------------------------------

export default function CompactLayout({ children }: PropsReactNode) {
  return (
    <>
      <Header />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
