import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { UserRoles } from 'src/utils/const/user-roles.enum';

import Iconify from 'src/shared/iconify';
import { RouterLink } from 'src/shared/router-link';
import { NavItemProps, NavItemStateProps } from 'src/shared/nav-section/types';

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  (
    {
      title,
      titleShort,
      path,
      icon,
      info,
      disabled,
      caption,
      needButtonLink,
      captionFull,
      roles,
      //
      open,
      depth,
      active,
      hasChild,
      externalLink,
      currentRole = 'admin',
      ...other
    },
    ref
  ) => {
    const subItem = depth !== 1;
    const router = useRouter();

    const hasButton = hasChild && path && needButtonLink;

    const handleClickHeader = (event: any) => {
      if (path) {
        event.stopPropagation();
        router.push(path);
      }
    };

    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableGutters
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {!subItem && icon && (
          <Box component="span" className="icon">
            {icon}
          </Box>
        )}

        {subItem && icon ? (
          <Box component="span" className="icon">
            {icon}
          </Box>
        ) : (
          <Box component="span" className="sub-icon" />
        )}

        {title && (
          <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
            <Box
              component="span"
              className="label"
              sx={{ cursor: 'pointer', ':hover': { color: 'primary.main' } }}
            >
              {title}
            </Box>

            {(caption || captionFull) && (
              <Tooltip title={caption} placement="top-start">
                <Box component="span" className="caption">
                  {captionFull || caption}
                </Box>
              </Tooltip>
            )}
          </Box>
        )}

        {info && (
          <Box component="span" className="info">
            {info}
          </Box>
        )}

        {hasButton && (
          <Button
            variant="contained"
            onClick={(event) => handleClickHeader(event)}
            color="success"
            sx={{
              fontSize: '9px',
              padding: '4px 2px 6px 2px',
              minWidth: '50px',
            }}
          >
            Перейти
          </Button>
        )}

        {hasChild && (
          <Iconify
            width={16}
            className="arrow"
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          />
        )}
      </StyledNavItem>
    );

    // Hidden item by role
    if (roles && !roles.includes(currentRole as UserRoles)) {
      return null;
    }

    if (hasChild) {
      return renderContent;
    }

    if (externalLink)
      return (
        <Link
          href={path}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            ...(disabled && {
              cursor: 'default',
            }),
          }}
        >
          {renderContent}
        </Link>
      );

    return (
      <Link
        component={RouterLink}
        href={path || '#'}
        color="inherit"
        underline="none"
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </Link>
    );
  }
);

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<NavItemStateProps>(({ active, open, depth, theme }) => {
  const subItem = depth !== 1;

  const opened = open && !active;

  const deepSubItem = Number(depth) > 2;

  const noWrapStyles = {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  } as const;

  const baseStyles = {
    item: {
      marginBottom: 4,
      borderRadius: 8,
      color: theme.palette.text.secondary,
      padding: theme.spacing(0.5, 1, 0.5, 1.5),
    },
    icon: {
      width: 24,
      height: 24,
      flexShrink: 0,
      marginRight: theme.spacing(2),
    },
    label: {
      ...noWrapStyles,
      ...theme.typography.body2,
      fontWeight: theme.typography[active ? 'fontWeightSemiBold' : 'fontWeightMedium'],
    },
    caption: {
      ...noWrapStyles,
      ...theme.typography.caption,
      color: theme.palette.text.disabled,
    },
    info: {
      display: 'inline-flex',
      marginLeft: theme.spacing(0.75),
    },
    arrow: {
      flexShrink: 0,
      marginLeft: theme.spacing(0.75),
    },
  } as const;

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      minHeight: 44,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        display: 'none',
      },
      '& .label': {
        ...baseStyles.label,
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
      },
      ...(active && {
        color:
          theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
    }),

    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 36,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        ...baseStyles.icon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          content: '""',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: theme.palette.text.disabled,
          transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(active && {
            transform: 'scale(2)',
            backgroundColor: theme.palette.primary.main,
          }),
        },
      },
      '& .label': {
        ...baseStyles.label,
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
      },
      ...(active && {
        color: theme.palette.text.primary,
      }),
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: `${theme.spacing(Number(depth))} !important`,
    }),
  };
});
