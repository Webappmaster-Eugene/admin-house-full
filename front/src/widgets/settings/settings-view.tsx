'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserUpdateCommand, UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import {
  Tab,
  Box,
  Tabs,
  Card,
  Grid,
  Stack,
  Button,
  Switch,
  Container,
  Typography,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import Iconify from 'src/shared/iconify';
import { useSettingsContext } from 'src/shared/settings';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { updateProfile } from 'src/api/actions/user/update-profile.action';
import { changePassword } from 'src/api/actions/auth/change-password.action';

type SettingsViewProps = {
  currentUser: UserGetFullInfoCommand.ResponseEntity;
};

const TABS = [
  { value: 'general', label: 'Общее', icon: 'solar:user-id-bold' },
  { value: 'security', label: 'Безопасность', icon: 'solar:shield-keyhole-bold' },
  { value: 'appearance', label: 'Внешний вид', icon: 'solar:palette-bold' },
];

export default function SettingsView({ currentUser }: SettingsViewProps) {
  const settings = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('general');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Настройки"
        links={[
          { name: 'Главная', href: paths.dashboard.root },
          { name: 'Профиль', href: paths.profile.profile },
          { name: 'Настройки' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={currentTab} onChange={(_, val) => setCurrentTab(val)} sx={{ mb: 3 }}>
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={<Iconify icon={tab.icon} width={20} />}
            iconPosition="start"
          />
        ))}
      </Tabs>

      {currentTab === 'general' && <GeneralTab currentUser={currentUser} />}
      {currentTab === 'security' && <SecurityTab />}
      {currentTab === 'appearance' && <AppearanceTab />}
    </Container>
  );
}

// ---------------- General ----------------

type GeneralFormValues = {
  firstName: string;
  secondName: string;
  phone: string;
  address: string;
  info: string;
  avatar: string;
};

const GeneralSchema: Yup.ObjectSchema<GeneralFormValues> = Yup.object().shape({
  firstName: Yup.string().required('Имя обязательно').max(100),
  secondName: Yup.string().max(100).default(''),
  phone: Yup.string().max(50).default(''),
  address: Yup.string().max(255).default(''),
  info: Yup.string().max(1000).default(''),
  avatar: Yup.string().max(1000).default(''),
});

function GeneralTab({ currentUser }: { currentUser: UserGetFullInfoCommand.ResponseEntity }) {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<GeneralFormValues>({
    resolver: yupResolver(GeneralSchema),
    defaultValues: {
      firstName: currentUser.firstName ?? '',
      secondName: currentUser.secondName ?? '',
      phone: currentUser.phone ?? '',
      address: currentUser.address ?? '',
      info: currentUser.info ?? '',
      avatar: currentUser.avatar ?? '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    const dto: UserUpdateCommand.Request = {
      firstName: values.firstName,
      secondName: values.secondName || null,
      phone: values.phone || null,
      address: values.address || null,
      info: values.info || null,
      avatar: values.avatar || null,
    } as UserUpdateCommand.Request;

    const result = await updateProfile(currentUser.uuid, dto);

    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось сохранить профиль', { variant: 'error' });
      return;
    }

    enqueueSnackbar('Профиль сохранён', { variant: 'success' });
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <CardHeader title="Личные данные" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <RHFTextField name="firstName" label="Имя" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField name="secondName" label="Фамилия" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField name="phone" label="Телефон" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField name="address" label="Адрес" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="avatar" label="URL аватара" placeholder="https://..." />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="info" label="О себе" multiline rows={3} />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isDirty || isSubmitting}
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

// ---------------- Security ----------------

type SecurityFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const SecuritySchema = Yup.object().shape({
  oldPassword: Yup.string().required('Введите текущий пароль'),
  newPassword: Yup.string()
    .required('Введите новый пароль')
    .min(8, 'Минимум 8 символов')
    .notOneOf([Yup.ref('oldPassword')], 'Новый пароль не должен совпадать с текущим'),
  confirmPassword: Yup.string()
    .required('Подтвердите новый пароль')
    .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают'),
});

function SecurityTab() {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<SecurityFormValues>({
    resolver: yupResolver(SecuritySchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (values) => {
    const result = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });

    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar(
        'Смена пароля временно недоступна — endpoint бэкенда ещё не реализован',
        { variant: 'warning' }
      );
      return;
    }

    enqueueSnackbar('Пароль успешно изменён', { variant: 'success' });
    reset();
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <CardHeader
          title="Смена пароля"
          subheader="Текущий пароль будет заменён на новый. Минимум 8 символов."
        />
        <CardContent>
          <Stack spacing={2} sx={{ maxWidth: 480 }}>
            <RHFTextField name="oldPassword" label="Текущий пароль" type="password" />
            <RHFTextField name="newPassword" label="Новый пароль" type="password" />
            <RHFTextField name="confirmPassword" label="Подтверждение нового пароля" type="password" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ alignSelf: 'flex-start' }}
            >
              {isSubmitting ? 'Изменение...' : 'Изменить пароль'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

// ---------------- Appearance ----------------

function AppearanceTab() {
  const settings = useSettingsContext();

  const handleToggleDark = () =>
    settings.onUpdate('themeMode', settings.themeMode === 'dark' ? 'light' : 'dark');

  const handleToggleStretch = () => settings.onUpdate('themeStretch', !settings.themeStretch);

  return (
    <Card>
      <CardHeader title="Внешний вид" subheader="Настройки сохраняются локально в браузере." />
      <CardContent>
        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Switch checked={settings.themeMode === 'dark'} onChange={handleToggleDark} />
            }
            label={
              <Box>
                <Typography variant="body1">Тёмная тема</Typography>
                <Typography variant="body2" color="text.secondary">
                  Переключение между светлой и тёмной темой интерфейса.
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={<Switch checked={settings.themeStretch} onChange={handleToggleStretch} />}
            label={
              <Box>
                <Typography variant="body1">Растягивать контент по ширине</Typography>
                <Typography variant="body2" color="text.secondary">
                  Использовать всю доступную ширину экрана для основного содержимого.
                </Typography>
              </Box>
            }
          />

          <Box sx={{ pt: 2 }}>
            <Button variant="outlined" onClick={settings.onReset} disabled={!settings.canReset}>
              Сбросить все настройки
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
