'use client';

import { m } from 'framer-motion';
import { varHover } from '@/shared/animate';
import { logoutUser } from '@/api/actions/auth/logout.action';
import { useCurrentUserStore } from '@/store/auth/user-auth.store';
import CustomPopover, { usePopover } from '@/shared/custom-popover';
import { AccountPopoverLinks } from '@/utils/const/account-popover.links';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { UserRoles } from 'src/utils/const/user-roles.enum';
import { isUriImage } from 'src/utils/helpers/is-uri-image';
import { useRouter } from 'src/utils/hooks/router-hooks/use-router';
import { useMockedUserData } from 'src/utils/hooks/use-mocked-user';

export default function AccountPopover() {
  const router = useRouter();

  const { mockedData } = useMockedUserData();
  const { user } = useCurrentUserStore((state) => state);

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatar && isUriImage(user?.avatar) ? user?.avatar : mockedData?.photoURL}
          alt={`${user?.firstName?.charAt(0).toUpperCase()}. ${user?.secondName}`}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {((typeof user?.avatar === 'string' && !isUriImage(user?.avatar)) || !user?.avatar) &&
            `${user?.firstName?.charAt(0).toUpperCase()}. ${user?.secondName && user?.secondName.charAt(0).toUpperCase()}.`}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user?.firstName?.charAt(0).toUpperCase()}. ${user?.secondName}`}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {AccountPopoverLinks.map(
            (option) =>
              (!option?.userRoles ||
                option.userRoles.includes((user?.roles && user?.roles[0].name) as UserRoles)) && (
                <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                  {option.label}
                </MenuItem>
              )
          )}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Выйти
        </MenuItem>
      </CustomPopover>
    </>
  );
}
