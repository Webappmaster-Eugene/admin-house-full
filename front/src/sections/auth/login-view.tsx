'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { isErrorFieldType } from 'src/utils/type-guards/is-error-field.type-guard';

import { login } from 'src/api/actions/auth-actions/login.action';
import { getAllUsers } from 'src/api/actions/user-actions/get-all-users.action';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  // const appInfo = useAppInfoStore((state) => state.appInfo);
  // console.log(appInfo);

  // const userInfo = useCurrentUserStore((state) => state.user);
  // console.log('dsfsfsdfsdfsdfsd', userInfo);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'admin@mail.ru',
    password: '!qwertY32',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    if (event) {
      console.log('preventDefault');
      event?.preventDefault();
    }

    const user = await login({ email: data.email, password: data.password });

    if (!isErrorFieldType(user)) {
      console.log(user);
      // router.push(returnTo || PATH_AFTER_LOGIN);
    } else {
      console.log(user);
      const { error } = user;
      // reset();
      setErrorMsg(typeof error === 'string' ? error : 'Ошибка входа');
    }

    const allUsers = await getAllUsers();

    if (!isErrorFieldType(allUsers)) {
      console.log(allUsers);
      // router.push(returnTo || PATH_AFTER_LOGIN);
    } else {
      console.log(allUsers);
      const { error } = allUsers;
      // reset();
      setErrorMsg(typeof error === 'string' ? error : 'Ошибка поиска всех пользователей');
    }
  });

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          {/* <Link component={RouterLink} href={paths.auth.register} variant="subtitle2"> */}
          <Link href={paths.auth.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="email" label="Email address" />

          <RHFTextField
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
            Forgot password?
          </Link>

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
