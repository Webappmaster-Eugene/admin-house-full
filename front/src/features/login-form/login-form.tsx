'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBoolean } from '@/shared/hooks/use-boolean';
import FormProvider, { RHFTextField } from '@/entities/hook-form';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/shared';

export function LoginForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  // const searchParams = useSearchParams();

  // const returnTo = searchParams.get('returnTo');

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
      // await loginUser();
      // router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <>
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <FormProvider methods={methods} onSubmit={onSubmit}>
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
      </FormProvider>
    </>
  );
}
