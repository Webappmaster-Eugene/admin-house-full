'use client';

import * as Yup from 'yup';
import Iconify from '@/shared/iconify';
import { useForm } from 'react-hook-form';
import { RouterLink } from '@/shared/router-link';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from '@/shared/hook-form';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

import { register } from 'src/api/actions/auth/register.action';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const router = useRouter();
  const isPasswordOpen = useBoolean();
  const isConfirmPasswordOpen = useBoolean();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Имя обязательно для заполнения'),
    lastName: Yup.string().required('Фамилия обязательна для заполнения'),
    email: Yup.string().required('Email обязателен для заполнения').email('Email должен быть корректным адресом электронной почты'),
    password: Yup.string().required('Пароль обязателен для заполнения'),
    confirmPassword: Yup.string()
      .required('Подтверждение пароля обязательно')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    if (event) {
      event?.preventDefault();
    }

    // startTransition(async () => {
    const user = await register({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName,
      secondName: data.lastName,
    });
    // все операции должны располагаться ниже здесь
    // });

    if (!isErrorFieldTypeGuard(user)) {
      router.push(returnTo || paths.dashboard.root);
    } else {
      const { error } = user;
      reset();
      if (isNameInErrorTypeGuard(error)) {
        setError('root', { message: frontendFromBackendErrors[error.name] || error.name });
      } else {
        setError('root', {
          message:
            typeof error === 'string' ? error : 'Неизвестная ошибка при регистрации пользователя',
        });
      }
    }
  });

  return (
    <>
      {/* render head */}
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Начать пользоваться можно бесплатно</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Уже есть аккаунт? </Typography>

          <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
            Войти
          </Link>
        </Stack>
      </Stack>

      {!!errors.root?.message && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errors.root?.message}
        </Alert>
      )}

      {/* render form register */}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <RHFTextField name="firstName" label="Имя" />
            <RHFTextField name="lastName" label="Фамилия" />
          </Stack>

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
            Создать аккаунт
          </LoadingButton>
        </Stack>
      </FormProvider>

      {/* terms and conditions */}
      <Typography
        component="div"
        sx={{
          mt: 2.5,
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        }}
      >
        {'Регистрируясь, вы соглашаетесь с '}
        <Link href={paths.terms} underline="always" color="text.primary">
          Соглашением об использовании
        </Link>
        {' и '}
        <Link href={paths.privacy} underline="always" color="text.primary">
          Политикой конфиденциальности
        </Link>
        .
      </Typography>
    </>
  );
}
