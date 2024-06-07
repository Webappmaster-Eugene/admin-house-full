'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import Iconify from '@/entities/iconify';
import { useForm } from 'react-hook-form';
import { paths } from '@/shared/routes/paths';
import { RouterLink } from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBoolean } from '@/shared/hooks/use-boolean';
import { PATH_AFTER_LOGIN } from '@/shared/config-global';
import { useRouter, useSearchParams } from 'next/navigation';
import FormProvider, { RHFTextField } from '@/entities/hook-form';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { authStore } from 'src/widgets/auth/store/auth.store';
import { useGetFromStore } from 'src/shared/hooks/zustand/use-get-from-store';

export function LoginView() {
  const store = authStore((state) => state);
  //
  // await logins('admin@mail.ru', '!qwertY32');
  const token = useGetFromStore(authStore, (state) => state.accessToken);
  // console.log(store.actions.login);
  store.login('admin@mail.ru', '!qwertY32');
  // const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const isPasswordViewed = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email необходимо заполнить')
      .email('Email должен быть валидным email-адресом'),
    password: Yup.string().required('Пароль необходимо заполнить'),
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

  // Selectors
  // const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
  // const accessTokenDataSelector = (state: ExtractState<typeof authStore>) => state.accessTokenData;
  // const refreshTokenSelector = (state: ExtractState<typeof authStore>) => state.refreshToken;
  // const refreshTokenDataSelector = (state: ExtractState<typeof authStore>) =>
  //   state.refreshTokenData;
  // const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Войти в House Admin</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Нет аккаунта?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Зарегистрироваться
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Электронная почта" />

      <RHFTextField
        name="password"
        label="Пароль"
        type={isPasswordViewed.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={isPasswordViewed.onToggle} edge="end">
                <Iconify
                  icon={isPasswordViewed.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
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
  );

  return (
    <>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        <p>
          <strong>Для входа в систему по умолчанию:</strong>
        </p>
        <p>
          Логин: <strong>manager@mail.ru </strong>
        </p>
        <p>
          Пароль :<strong> demo1234</strong>
        </p>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
