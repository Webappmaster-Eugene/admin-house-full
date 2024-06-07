'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import Iconify from '@/entities/iconify';
import { useForm } from 'react-hook-form';
import { paths } from '@/shared/routes/paths';
import { RouterLink } from '@/shared/components';
import { useAuthContext } from '@/shared/auth/hooks';
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

export function RegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const isPasswordViewed = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Требуется ввести имя'),
    lastName: Yup.string().required('Требуется ввести фамилию'),
    email: Yup.string()
      .required('Требуется ввести почту')
      .email('Email должен быть валидной электронной почтой'),
    password: Yup.string().required('Требуется ввести пароль'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.email, data.password, data.firstName, data.lastName);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Регистрация</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Уже есть аккаунт? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Войти
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      Регистрируясь, вы соглашаетесь с{' '}
      <Link href="#" underline="always" color="text.primary">
        Условиями сервиса
      </Link>
      {' и '}
      <Link href="#" underline="always" color="text.primary">
        Политикой конфиденциальности
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="firstName" label="Имя" />
        <RHFTextField name="lastName" label="Фамилия" />
      </Stack>

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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Create account
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>

      {renderTerms}
    </>
  );
}
