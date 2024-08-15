'use client';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import Iconify from 'src/shared/iconify';
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';

export default function BreadcrumbsView() {
  return (
    <>
      <CustomBreadcrumbs
        heading="Breadcrumbs"
        links={[
          {
            name: 'Главная',
            href: '/',
          },
          { name: 'Breadcrumbs' },
        ]}
        // moreLink={['https://mui.com/components/custom-breadcrumbs']}
      />

      <Breadcrumbs>
        <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon="eva:home-fill" sx={{ mr: 0.5 }} />
          Material-UI
        </Link>
        <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon="eva:camera-fill" sx={{ mr: 0.5 }} />
          Core
        </Link>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
          }}
        >
          <Iconify icon="solar:bell-bing-bold-duotone" sx={{ mr: 0.5 }} />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    </>
  );
}
