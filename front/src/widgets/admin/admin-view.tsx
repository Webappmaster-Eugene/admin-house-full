'use client';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';
import { UserGetAllCommand, UserCreateCommand } from '@numart/house-admin-contracts';

import {
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  Table,
  Avatar,
  Button,
  Dialog,
  Tooltip,
  TableRow,
  Checkbox,
  Container,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  Typography,
  IconButton,
  CardHeader,
  DialogTitle,
  CardContent,
  DialogContent,
  DialogActions,
  TableContainer,
  CircularProgress,
  FormControlLabel,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { UserRoles } from 'src/utils/const/user-roles.enum';
import { ROLE_IDS, ROLE_NAME_BY_ID } from 'src/utils/const/role-ids';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import Label from 'src/shared/label';
import Iconify from 'src/shared/iconify';
import { useSettingsContext } from 'src/shared/settings';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { createUser } from 'src/api/actions/user/create-user.action';
import { deleteUser } from 'src/api/actions/user/delete-user.action';
import { getAllUsers } from 'src/api/actions/user/get-all-users.action';
import { getAdminKey } from 'src/api/actions/auth/get-admin-key.action';
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { updateUserRoles } from 'src/api/actions/user/update-user-roles.action';
import { generateAdminKey } from 'src/api/actions/auth/generate-admin-key.action';

type UserRow = UserGetAllCommand.ResponseEntity[number];

const roleLabel = (name: string): string =>
  ROLE_NAME_BY_ID[
    {
      [UserRoles.ADMIN]: ROLE_IDS.ADMIN,
      [UserRoles.MANAGER]: ROLE_IDS.MANAGER,
      [UserRoles.WORKER]: ROLE_IDS.WORKER,
      [UserRoles.CUSTOMER]: ROLE_IDS.CUSTOMER,
    }[name] ?? 0
  ] ?? name;

const roleChipColor = (role: string): 'error' | 'warning' | 'info' | 'success' | 'default' => {
  switch (role) {
    case UserRoles.ADMIN:
      return 'error';
    case UserRoles.MANAGER:
      return 'warning';
    case UserRoles.WORKER:
      return 'info';
    case UserRoles.CUSTOMER:
      return 'success';
    default:
      return 'default';
  }
};

export default function AdminView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [keyLoading, setKeyLoading] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [rolesUser, setRolesUser] = useState<UserRow | null>(null);
  const [deleteUserRow, setDeleteUserRow] = useState<UserRow | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const result = await getAllUsers();
    setLoading(false);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось загрузить пользователей', { variant: 'error' });
      setUsers([]);
      return;
    }
    setUsers((result as UserRow[]) ?? []);
  }, [enqueueSnackbar]);

  const loadKey = useCallback(async () => {
    const result = await getAdminKey();
    if (isErrorFieldTypeGuard(result)) {
      setAdminKey(null);
      return;
    }
    setAdminKey((result as { key: string }).key ?? null);
  }, []);

  useEffect(() => {
    loadUsers();
    loadKey();
  }, [loadUsers, loadKey]);

  const handleGenerateKey = async () => {
    const secret = window.prompt(
      'Введите KEY_SECRET_FOR_STRICT_ADMIN_KEY (известен только администратору сервера)'
    );
    if (!secret) return;
    setKeyLoading(true);
    const result = await generateAdminKey(secret);
    setKeyLoading(false);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось сгенерировать ключ', { variant: 'error' });
      return;
    }
    setAdminKey((result as { key: string }).key);
    enqueueSnackbar('Новый ключ сгенерирован', { variant: 'success' });
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserRow) return;
    const result = await deleteUser(deleteUserRow.uuid);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Ошибка при удалении', { variant: 'error' });
      setDeleteUserRow(null);
      return;
    }
    enqueueSnackbar('Пользователь удалён', { variant: 'success' });
    setDeleteUserRow(null);
    await loadUsers();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Админ-панель"
        links={[
          { name: 'Главная', href: paths.dashboard.root },
          { name: 'Профиль', href: paths.profile.profile },
          { name: 'Админ-панель' },
        ]}
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="solar:user-plus-bold" />}
            onClick={() => setCreateOpen(true)}
          >
            Создать пользователя
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Пользователи"
              subheader={
                users ? `Всего: ${users.length}` : 'Загрузка...'
              }
            />
            <CardContent>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Пользователь</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Роли</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell align="right">Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(users ?? []).map((user) => {
                        const fullName =
                          [user.firstName, user.secondName].filter(Boolean).join(' ') ||
                          'Без имени';
                        return (
                          <TableRow key={user.uuid} hover>
                            <TableCell>
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar src={user.avatar || undefined} sx={{ width: 32, height: 32 }}>
                                  {fullName.charAt(0)}
                                </Avatar>
                                <Typography variant="body2">{fullName}</Typography>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {user.email}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                                {(user.roles ?? []).map((r: { name: string }) => (
                                  <Label key={r.name} color={roleChipColor(r.name)}>
                                    {roleLabel(r.name)}
                                  </Label>
                                ))}
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Chip
                                size="small"
                                label={user.userStatus ?? 'ACTIVE'}
                                color={user.userStatus === 'ACTIVE' ? 'success' : 'default'}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Tooltip title="Изменить роли">
                                <IconButton size="small" onClick={() => setRolesUser(user)}>
                                  <Iconify icon="solar:shield-user-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Удалить">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => setDeleteUserRow(user)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {users && users.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                              Пользователей нет
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Ключ регистрации с ролью"
              subheader="Используется для регистрации пользователей с ролью ADMIN, MANAGER или WORKER"
            />
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                <TextField
                  fullWidth
                  value={adminKey ?? ''}
                  placeholder="Ключ ещё не сгенерирован"
                  InputProps={{ readOnly: true }}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<Iconify icon="solar:refresh-bold" />}
                  onClick={handleGenerateKey}
                  disabled={keyLoading}
                >
                  {keyLoading ? 'Генерация...' : 'Сгенерировать новый'}
                </Button>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Передайте этот ключ пользователю — он будет нужен ему при регистрации со специальной
                ролью.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CreateUserDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={loadUsers}
      />

      {rolesUser && (
        <RolesDialog
          user={rolesUser}
          onClose={() => setRolesUser(null)}
          onUpdated={loadUsers}
        />
      )}

      <Dialog open={!!deleteUserRow} onClose={() => setDeleteUserRow(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Удалить пользователя?</DialogTitle>
        <DialogContent>
          <Typography>
            Пользователь <b>{deleteUserRow?.email}</b> будет удалён без возможности восстановления.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserRow(null)}>Отмена</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

// ---------------- Create dialog ----------------

type CreateFormValues = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  phone: string;
};

const CreateSchema: Yup.ObjectSchema<CreateFormValues> = Yup.object().shape({
  firstName: Yup.string().required('Имя обязательно'),
  secondName: Yup.string().default(''),
  email: Yup.string().email('Некорректный email').required('Email обязателен'),
  password: Yup.string().required('Пароль обязателен').min(8, 'Минимум 8 символов'),
  phone: Yup.string().default(''),
});

function CreateUserDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<CreateFormValues>({
    resolver: yupResolver(CreateSchema),
    defaultValues: { firstName: '', secondName: '', email: '', password: '', phone: '' },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  const onSubmit = handleSubmit(async (values) => {
    const dto = {
      firstName: values.firstName,
      secondName: values.secondName || null,
      email: values.email,
      password: values.password,
      phone: values.phone || null,
    } as UserCreateCommand.Request;
    const result = await createUser(dto);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать пользователя', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Пользователь создан (роль: Заказчик)', { variant: 'success' });
    onClose();
    await onCreated();
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Создать пользователя</DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Stack direction="row" spacing={2}>
              <RHFTextField name="firstName" label="Имя" />
              <RHFTextField name="secondName" label="Фамилия" />
            </Stack>
            <RHFTextField name="email" label="Email" />
            <RHFTextField name="password" label="Пароль" type="password" />
            <RHFTextField name="phone" label="Телефон" />
            <Typography variant="caption" color="text.secondary">
              Пользователь создаётся с ролью «Заказчик». Изменить роли можно после создания.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Создание...' : 'Создать'}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

// ---------------- Roles dialog ----------------

const ALL_ROLES = [
  { id: ROLE_IDS.ADMIN, name: 'ADMIN', label: 'Администратор' },
  { id: ROLE_IDS.MANAGER, name: 'MANAGER', label: 'Менеджер' },
  { id: ROLE_IDS.WORKER, name: 'WORKER', label: 'Сотрудник' },
  { id: ROLE_IDS.CUSTOMER, name: 'CUSTOMER', label: 'Заказчик' },
];

function RolesDialog({
  user,
  onClose,
  onUpdated,
}: {
  user: UserRow;
  onClose: () => void;
  onUpdated: () => Promise<void>;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const existingRoleNames = (user.roles ?? []).map((r: { name: string }) => r.name);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSubmit = async () => {
    const idsToAdd = ALL_ROLES.filter((r) => selected.includes(r.name)).map((r) => r.id);
    if (idsToAdd.length === 0) {
      enqueueSnackbar('Выберите хотя бы одну роль для добавления', { variant: 'warning' });
      return;
    }
    setSubmitting(true);
    const result = await updateUserRoles(user.uuid, { rolesIds: idsToAdd });
    setSubmitting(false);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось обновить роли (возможно, роль уже назначена)', {
        variant: 'error',
      });
      return;
    }
    enqueueSnackbar('Роли обновлены', { variant: 'success' });
    onClose();
    await onUpdated();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Добавить роли</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Текущие роли: {existingRoleNames.length ? existingRoleNames.join(', ') : '—'}
        </Typography>
        <Stack>
          {ALL_ROLES.map((r) => {
            const alreadyHas = existingRoleNames.includes(r.name);
            return (
              <FormControlLabel
                key={r.id}
                control={
                  <Checkbox
                    checked={alreadyHas || selected.includes(r.name)}
                    disabled={alreadyHas}
                    onChange={() => toggle(r.name)}
                  />
                }
                label={alreadyHas ? `${r.label} (уже есть)` : r.label}
              />
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Сохранение...' : 'Добавить роли'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
