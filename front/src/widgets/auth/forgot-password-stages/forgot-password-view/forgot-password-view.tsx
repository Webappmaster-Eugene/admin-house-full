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
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/utils/routes/paths';
import { ForgotState } from 'src/utils/const/forgot-password.enum';

import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { ForgotPasswordViewProps } from 'src/widgets/auth/forgot-password-stages/forgot-password-view/forgot-password-view.props';

// ----------------------------------------------------------------------

export default function ForgotPasswordView({
  setForgotState,
  forgotState,
}: ForgotPasswordViewProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
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
    setForgotState({ state: ForgotState.CodeEntering, email: data.email });
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
        <Image src="/images/ic-password.svg" alt="" width={100} height={100} />
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
          }}
        >
          Забыли пароль?
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
          }}
        >
          Пожалуйста, напишите Ваш email и мы отправим Вам код для сброса пароля.
        </Typography>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField name="email" label="Email" />

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
