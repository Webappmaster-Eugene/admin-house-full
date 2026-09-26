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
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { forgotPassword } from 'src/api/actions/auth/forgot-password.action';
import { ForgotPasswordViewProps } from 'src/widgets/auth/forgot-password-stages/forgot-password-view/forgot-password-view.props';

// ----------------------------------------------------------------------

export default function ForgotPasswordView({
  setForgotState,
  forgotState,
}: ForgotPasswordViewProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email обязателен для заполнения')
      .email('Email должен быть корректным адресом электронной почты'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');

    const result = await forgotPassword({ email: data.email });

    if (isErrorFieldTypeGuard(result)) {
      setErrorMsg('Произошла ошибка при отправке кода. Попробуйте позже.');
      return;
    }

    setForgotState({ state: ForgotState.CodeEntering, email: data.email });
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
          component="h1"
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
            Отправить код
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
