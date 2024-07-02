'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import Iconify from '@/shared/iconify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from '@/shared/hook-form';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/utils/routes/paths';
import { useBoolean } from 'src/utils/hooks/use-boolean';
import { useRouter } from 'src/utils/hooks/router-hooks/use-router';
import { useSearchParams } from 'src/utils/hooks/router-hooks/use-search-params';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { frontendFromBackendErrors } from 'src/utils/const/frontend-from-backend.errors';
import { isNameInErrorTypeGuard } from 'src/utils/type-guards/is-name-in-error.type-guard';

import { login } from 'src/api/actions/auth/login.action';

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const isPasswordOpen = useBoolean();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

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
      event?.preventDefault();
    }

    const user = await login({ email: data.email, password: data.password });

    if (!isErrorFieldTypeGuard(user)) {
      router.push(returnTo || paths.dashboard.root);
    } else {
      const { error } = user;
      reset();
      if (isNameInErrorTypeGuard(error)) {
        setErrorMsg(frontendFromBackendErrors[error.name] || error.name);
      } else {
        setErrorMsg(
          typeof error === 'string' ? error : 'Неизвестная ошибка при входе пользователя'
        );
      }
    }
  });

  return (
    <>
      <Stack spacing={2} sx={{ mb: 5 }}>
        <Typography variant="h4">Войти в приложение</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Вы здесь впервые?</Typography>

          {/* <Link component={RouterLink} href={paths.auth.register} variant="subtitle2"> */}
          <Link href={paths.auth.register} variant="subtitle2">
            Создать аккаунт
          </Link>
        </Stack>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Почта : <strong>admin@mail.ru</strong> / пароль :<strong> !qwertY32</strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="email" label="Почта" />

          <RHFTextField
            name="password"
            label="Пароль"
            type={isPasswordOpen.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={isPasswordOpen.onToggle} edge="end">
                    <Iconify
                      icon={isPasswordOpen.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
            Забыли пароль?
          </Link>

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Войти
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
