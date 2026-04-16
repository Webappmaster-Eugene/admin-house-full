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
import { verifyResetCode } from 'src/api/actions/auth/verify-reset-code.action';
import { CodeEnteringViewProps } from 'src/widgets/auth/forgot-password-stages/code-entering-view/code-entering-view.props';

// ----------------------------------------------------------------------

export default function CodeEnteringView({ setForgotState, forgotState }: CodeEnteringViewProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const CodeEnteringSchema = Yup.object().shape({
    code: Yup.string()
      .required('Код обязателен для заполнения')
      .length(6, 'Код должен содержать 6 цифр'),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(CodeEnteringSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg('');

    const result = await verifyResetCode({
      email: forgotState.email,
      code: data.code,
    });

    if (isErrorFieldTypeGuard(result)) {
      setErrorMsg('Неверный код или срок действия кода истёк. Попробуйте снова.');
      return;
    }

    setForgotState({
      state: ForgotState.PasswordReset,
      email: forgotState.email,
      code: data.code,
    });
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
          Проверьте почту
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
          }}
        >
          Мы отправили 6-значный код на <strong>{forgotState.email}</strong>. Введите его ниже.
        </Typography>
      </Stack>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <RHFTextField
            name="code"
            label="Код подтверждения"
            inputProps={{ maxLength: 6 }}
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Подтвердить
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
