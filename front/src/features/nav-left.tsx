import { CurrentUserInfo } from '@/entities/auth/lib';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useMockedUserData } from 'src/utils/hooks/use-mocked-user';

import Label from 'src/shared/label';
import { useCurrentUserStore } from 'src/store/auth/user-auth.store';

// ----------------------------------------------------------------------

export default function NavLeft() {
  const { mockedData } = useMockedUserData();
  const loginedUser: CurrentUserInfo = useCurrentUserStore((state) => state.user);
  console.log(loginedUser);

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={loginedUser?.avatar ? loginedUser?.avatar : mockedData?.photoURL}
            alt={`${loginedUser?.firstName?.charAt(0).toUpperCase()}. ${loginedUser?.secondName}`}
            sx={{ width: 48, height: 48 }}
          >
            {`${loginedUser?.firstName?.charAt(0).toUpperCase()}. ${loginedUser?.secondName}`}
          </Avatar>

          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            {(loginedUser && loginedUser?.roleName) || 'USER'}
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {`${loginedUser?.firstName?.charAt(0).toUpperCase()}. ${loginedUser?.secondName}`}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {loginedUser?.email}
          </Typography>
        </Stack>

        {/* <Button variant="contained" href={paths.minimalUI} target="_blank" rel="noopener"> */}
        {/*  Upgrade to Pro */}
        {/* </Button> */}
      </Stack>
    </Stack>
  );
}