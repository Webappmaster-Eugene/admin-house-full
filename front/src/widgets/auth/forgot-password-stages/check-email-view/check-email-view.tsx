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

import Iconify from 'src/shared/iconify';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { CheckEmailViewProps } from 'src/widgets/auth/forgot-password-stages/check-email-view/check-email-view.props';

// ----------------------------------------------------------------------

export default function CheckEmailView({ setForgotState, forgotState }: CheckEmailViewProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const isConfirmPasswordOpen = useBoolean();
  const isPasswordOpen = useBoolean();

  const CheckEmailSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    email: forgotState.email,
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(CheckEmailSchema),
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
    console.log('click');

    // const user = await login({ email: data.email, password: data.password });
    //
    // if (!isErrorFieldTypeGuard(user)) {
    //   router.push(returnTo || paths.dashboard.root);
    // } else {
    //   const { error } = user;
    //   reset();
    //   if (isNameInErrorTypeGuard(error)) {
    //     setErrorMsg(frontendFromBackendErrors[error.name] || error.name);
    //   } else {
    //     setErrorMsg(
    //       typeof error === 'string' ? error : 'Неизвестная ошибка при входе пользователя'
    //     );
    //   }
    // }
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
          Письмо успешно отправлено!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
          }}
        >
          Мы отправили Вам 6-значный код для подтверждения Email. Пожалуйста, введите код ниже.
        </Typography>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="email" label="Email address" disabled />

          <RHFTextField
            name="password"
            label="Придумайте пароль"
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
          >
            Отправить
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
