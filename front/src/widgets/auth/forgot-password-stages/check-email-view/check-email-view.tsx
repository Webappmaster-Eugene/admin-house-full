'use client';

import * as Yup from 'yup';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/utils/routes/paths';
import { useBoolean } from 'src/utils/hooks/use-boolean';
import { useRouter } from 'src/utils/hooks/router-hooks/use-router';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import Iconify from 'src/shared/iconify';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { resetPassword } from 'src/api/actions/auth/reset-password.action';
import { CheckEmailViewProps } from 'src/widgets/auth/forgot-password-stages/check-email-view/check-email-view.props';

// ----------------------------------------------------------------------

export default function CheckEmailView({ setForgotState, forgotState }: CheckEmailViewProps) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const isConfirmPasswordOpen = useBoolean();
  const isPasswordOpen = useBoolean();

  const CheckEmailSchema = Yup.object().shape({
    password: Yup.string()
      .required('Пароль обязателен для заполнения')
      .min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: Yup.string()
      .required('Подтверждение пароля обязательно')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(CheckEmailSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');
    setSuccessMsg('');

    const result = await resetPassword({
      email: forgotState.email,
      code: forgotState.code || '',
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (isErrorFieldTypeGuard(result)) {
      setErrorMsg('Не удалось сменить пароль. Попробуйте заново.');
      return;
    }

    setSuccessMsg('Пароль успешно изменён! Перенаправляем на страницу входа...');
    setTimeout(() => {
      router.push(paths.auth.login);
    }, 2000);
  });

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Image src="/images/ic-email-inbox.svg" alt="" width={100} height={100} />
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
          }}
        >
          Новый пароль
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
          }}
        >
          Придумайте новый пароль для аккаунта <strong>{forgotState.email}</strong>
        </Typography>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {!!successMsg && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField
            name="password"
            label="Новый пароль"
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

          <RHFTextField
            name="confirmPassword"
            label="Подтвердите пароль"
            type={isConfirmPasswordOpen.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={isConfirmPasswordOpen.onToggle} edge="end">
                    <Iconify
                      icon={
                        isConfirmPasswordOpen.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                      }
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
            disabled={!!successMsg}
          >
            Сменить пароль
          </LoadingButton>

          <Link
            href={paths.auth.login}
            variant="body2"
            color="inherit"
            underline="none"
            sx={{
              alignSelf: 'center',
              color: 'primary',
              '&:hover': {
                color: 'gray',
                transition: '0.3s',
                textShadow: '0 0 0.5px #000',
                transitionDelay: '0.2s',
              },
            }}
          >
            {'< Вернуться на сайт'}
          </Link>
        </Stack>
      </FormProvider>
    </>
  );
}
