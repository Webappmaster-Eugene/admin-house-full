'use client';

import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import {
  Box,
  Card,
  Chip,
  Grid,
  Table,
  Stack,
  Avatar,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Container,
  Typography,
  CardHeader,
  CardContent,
  TableContainer,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { UserRoles } from 'src/utils/const/user-roles.enum';

import Label from 'src/shared/label';
import Iconify from 'src/shared/iconify';
import { useSettingsContext } from 'src/shared/settings';
import RouterLink from 'src/shared/router-link/router-link';
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';

type ProfileProject = NonNullable<
  UserGetFullInfoCommand.ResponseEntity['memberOfProjects']
>[number];

type ProfileViewProps = {
  currentUser: UserGetFullInfoCommand.ResponseEntity;
};

const roleLabel = (role: string): string => {
  switch (role) {
    case UserRoles.ADMIN:
      return 'Администратор';
    case UserRoles.MANAGER:
      return 'Менеджер';
    case UserRoles.WORKER:
      return 'Сотрудник';
    case UserRoles.CUSTOMER:
      return 'Заказчик';
    default:
      return role;
  }
};

const roleColor = (role: string): 'error' | 'warning' | 'info' | 'success' | 'default' => {
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

export default function ProfileView({ currentUser }: ProfileViewProps) {
  const settings = useSettingsContext();

  const fullName =
    [currentUser.firstName, currentUser.secondName].filter(Boolean).join(' ') || 'Без имени';

  const userRoleNames = (currentUser.roles ?? []).map((role) => role.name);
  const isAdmin = userRoleNames.includes(UserRoles.ADMIN);
  const isManager = userRoleNames.includes(UserRoles.MANAGER);
  const isWorker = userRoleNames.includes(UserRoles.WORKER);
  const isCustomer = userRoleNames.includes(UserRoles.CUSTOMER);

  const workspaceAsCreator = currentUser.creatorOfWorkspace;
  const workspacesAsMember = currentUser.memberOfWorkspaces ?? [];
  const projectsAsCustomer = currentUser.customerOfProjects ?? [];
  const projectsAsManager = currentUser.responsibleManagerOfProjects ?? [];
  const projectsAsMember = currentUser.memberOfProjects ?? [];

  const initials = fullName
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Профиль"
        links={[{ name: 'Главная', href: paths.dashboard.root }, { name: 'Профиль' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={currentUser.avatar || undefined}
              sx={{ width: 96, height: 96, mx: 'auto', mb: 2, fontSize: 32 }}
            >
              {initials}
            </Avatar>

            <Typography variant="h6">{fullName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {currentUser.email}
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
              {userRoleNames.length === 0 ? (
                <Chip size="small" label="Без роли" />
              ) : (
                userRoleNames.map((role) => (
                  <Label key={role} color={roleColor(role)}>
                    {roleLabel(role)}
                  </Label>
                ))
              )}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={1}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<Iconify icon="solar:user-id-bold" />}
                component={RouterLink}
                href={paths.profile.settings}
              >
                Редактировать профиль
              </Button>
              {isAdmin && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<Iconify icon="solar:shield-user-bold" />}
                  component={RouterLink}
                  href={paths.profile.admin}
                >
                  Админ-панель
                </Button>
              )}
              {isManager && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="warning"
                  startIcon={<Iconify icon="solar:folder-with-files-bold" />}
                  component={RouterLink}
                  href={paths.dashboard.categoryMaterials}
                >
                  Перейти в справочник
                </Button>
              )}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card>
              <CardHeader title="Контактная информация" />
              <CardContent>
                <Grid container spacing={2}>
                  <InfoRow icon="solar:letter-bold" label="Email" value={currentUser.email} />
                  <InfoRow
                    icon="solar:phone-bold"
                    label="Телефон"
                    value={currentUser.phone || 'Не указан'}
                  />
                  <InfoRow
                    icon="solar:map-point-bold"
                    label="Адрес"
                    value={currentUser.address || 'Не указан'}
                  />
                  <InfoRow
                    icon="solar:document-text-bold"
                    label="О себе"
                    value={currentUser.info || 'Не указано'}
                  />
                </Grid>
              </CardContent>
            </Card>

            {(isManager || workspaceAsCreator || workspacesAsMember.length > 0) && (
              <Card>
                <CardHeader title="Рабочее пространство" />
                <CardContent>
                  {workspaceAsCreator && (
                    <Box sx={{ mb: workspacesAsMember.length ? 2 : 0 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Я создатель
                      </Typography>
                      <Typography variant="body1">
                        {workspaceAsCreator.name || 'Без названия'}
                      </Typography>
                      {workspaceAsCreator.description && (
                        <Typography variant="body2" color="text.secondary">
                          {workspaceAsCreator.description}
                        </Typography>
                      )}
                    </Box>
                  )}

                  {workspacesAsMember.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Я участник ({workspacesAsMember.length})
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {workspacesAsMember.map((ws) => (
                          <Chip key={ws.uuid} label={ws.name || 'Без названия'} size="small" />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader title="Активность" />
              <CardContent>
                <Grid container spacing={2}>
                  <StatTile
                    label="Проекты (участник)"
                    value={projectsAsMember.length}
                    color="info.main"
                  />
                  <StatTile
                    label="Проекты (заказчик)"
                    value={projectsAsCustomer.length}
                    color="success.main"
                  />
                  <StatTile
                    label="Проекты (менеджер)"
                    value={projectsAsManager.length}
                    color="warning.main"
                  />
                  <StatTile
                    label="Workspace"
                    value={workspacesAsMember.length + (workspaceAsCreator ? 1 : 0)}
                    color="primary.main"
                  />
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <Stack spacing={3} sx={{ mt: 3 }}>
        {isCustomer && (
          <ProjectsSection
            title="Проекты, где я заказчик"
            icon="solar:user-check-bold"
            projects={projectsAsCustomer}
            emptyText="Вы пока не являетесь заказчиком ни одного проекта"
          />
        )}
        {(isWorker || isCustomer) && (
          <ProjectsSection
            title="Проекты, где я участник"
            icon="solar:users-group-rounded-bold"
            projects={projectsAsMember}
            emptyText="Вы пока не добавлены ни в один проект"
          />
        )}
        {isManager && projectsAsManager.length > 0 && (
          <ProjectsSection
            title="Проекты под моим управлением"
            icon="solar:case-minimalistic-bold"
            projects={projectsAsManager}
            emptyText="Нет проектов"
          />
        )}
      </Stack>
    </Container>
  );
}

function ProjectsSection({
  title,
  icon,
  projects,
  emptyText,
}: {
  title: string;
  icon: string;
  projects: ProfileProject[];
  emptyText: string;
}) {
  const formatDate = (value: Date | string | null | undefined): string => {
    if (!value) return '—';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Card>
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon={icon} width={22} />
            <Typography variant="h6">{title}</Typography>
            <Chip size="small" label={projects.length} />
          </Stack>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {projects.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            {emptyText}
          </Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Описание</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Создан</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.uuid} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {project.name || 'Без названия'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {project.description || '—'}
                    </TableCell>
                    <TableCell>
                      <Label color={project.projectStatus === 'ACTIVE' ? 'success' : 'default'}>
                        {project.projectStatus ?? 'ACTIVE'}
                      </Label>
                    </TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary' }}>
                      {formatDate(project.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <Grid item xs={12} sm={6}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Iconify icon={icon} width={20} sx={{ color: 'text.disabled', mt: 0.25 }} />
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            {label}
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      </Stack>
    </Grid>
  );
}

function StatTile({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <Grid item xs={6} sm={3}>
      <Box
        sx={{
          textAlign: 'center',
          p: 2,
          borderRadius: 1,
          bgcolor: 'background.neutral',
        }}
      >
        <Typography variant="h4" sx={{ color }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Grid>
  );
}
