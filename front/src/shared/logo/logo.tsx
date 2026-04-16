import { forwardRef } from 'react';
import { RouterLink } from '@/shared/router-link';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  showText?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, showText = false, sx, ...other }, ref) => {
    const logoImage = (
      <Box
        component="img"
        src="/logo/logo_single.svg"
        alt="SMETAS"
        sx={{ width: 40, height: 40, flexShrink: 0 }}
      />
    );

    const logo = (
      <Stack ref={ref} direction="row" alignItems="center" spacing={1} sx={sx} {...other}>
        {logoImage}
        {showText && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, letterSpacing: 1, lineHeight: 1, userSelect: 'none' }}
          >
            SMETAS
          </Typography>
        )}
      </Stack>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
