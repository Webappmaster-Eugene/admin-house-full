import { forwardRef } from 'react';
import { RouterLink } from '@/shared/router-link';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.054 4.9875C22.9829 4.47578 21.686 4.21875 20.3993 4.21875C17.5594 12.5 19.918 25.5273 19.918 25.5273C19.918 25.5273 21.2141 10.4484 24.054 4.9875Z"
            fill="#8C1F66"
          />
          <path
            d="M18.8282 29.2163C18.8282 29.2163 20.0969 18.8937 15.0969 7.01709C13.9524 7.4585 12.9641 7.93271 12.05 8.921C18.054 19.6476 18.8282 29.2163 18.8282 29.2163Z"
            fill="#0DA4DD"
          />
          <path
            d="M18.0132 29.046C18.0132 24.8007 16.7843 21.5 13.1445 15.7078C13.1445 15.7078 12.0789 15.8742 11.0164 17.5875C17.25 23.2226 18.0132 29.046 18.0132 29.046Z"
            fill="#F88C20"
          />
          <path
            d="M17.2125 27.6796C15.425 24.0538 13.2055 20.5819 8.79141 18.6069C8.79141 18.6069 7.90312 19.3015 7.73438 21.2085C13.3055 22.5812 17.2125 27.6796 17.2125 27.6796Z"
            fill="#FFCA06"
          />
          <path
            d="M26.2844 13.5454C25.3391 12.5431 24.0117 12.2954 24.0117 12.2954C21.3836 16.5853 20.5914 23.4134 20.4235 29.8196C20.4235 29.8196 23.5969 16.1212 26.2844 13.5454Z"
            fill="#BCB6FF"
          />
          <path
            d="M29.907 22.5397C28.8992 20.8952 27.882 20.6499 27.882 20.6499C24.9132 22.9233 23.621 24.5108 21.6843 28.9522C21.6843 28.9522 24.275 24.5249 29.907 22.5397Z"
            fill="#D80077"
          />
          <path
            d="M33.3968 12.293C33.0476 10.9063 31.9078 9.81177 31.9078 9.81177C26.8382 13.3352 23.7523 19.6063 21.8796 26.6407C21.8796 26.6407 28.1874 14.6399 33.3968 12.293Z"
            fill="#2BA945"
          />
          <path d="M12.9 28.718V33.4555L20.1891 35.7329V30.9954L12.9 28.718Z" fill="#BA1723" />
          <path
            d="M27.4774 28.718V33.4555L20.1891 35.7329V30.9954L27.4774 28.718Z"
            fill="#DE1F26"
          />
        </svg>
      </Box>
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
