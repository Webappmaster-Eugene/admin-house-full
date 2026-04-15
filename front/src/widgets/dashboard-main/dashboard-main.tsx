'use client';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Container,
  Typography,
  CardActionArea,
} from '@mui/material';

import { paths } from 'src/utils/routes/paths';
import { UserRoles } from 'src/utils/const/user-roles.enum';

import Iconify from 'src/shared/iconify';
import { useSettingsContext } from 'src/shared/settings';
import RouterLink from 'src/shared/router-link/router-link';

import { DashboardMainProps } from './dashboard-main.props';

const QUICK_LINKS = [
  {
    title: 'Категории материалов',
    description: 'Структура каталога материалов',
    icon: 'solar:folder-2-bold',
    href: paths.dashboard.categoryMaterials,
    color: 'primary.main',
  },
  {
    title: 'Материалы',
    description: 'Все материалы в справочнике',
    icon: 'solar:box-bold',
    href: paths.dashboard.materials,
    color: 'success.main',
  },
  {
    title: 'Поля категорий',
    description: 'Настройка пользовательских полей',
    icon: 'solar:list-check-bold',
    href: paths.dashboard.fields,
    color: 'warning.main',
  },
  {
    title: 'Профиль',
    description: 'Личные данные и настройки',
    icon: 'solar:user-id-bold',
    href: paths.profile.profile,
    color: 'info.main',
  },
];

export default function DashboardMain({ currentUser, stats }: DashboardMainProps) {
  const settings = useSettingsContext();

  const fullName = currentUser.firstName || 'Пользователь';
  const userRoleNames = (currentUser.roles ?? []).map((r) => r.name);
  const isAdmin = userRoleNames.includes(UserRoles.ADMIN);
  const isManager = userRoleNames.includes(UserRoles.MANAGER);
  const hasWorkspace =
    !!currentUser.creatorOfWorkspace || (currentUser.memberOfWorkspaces?.length ?? 0) > 0;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4">Здравствуйте, {fullName}!</Typography>
        <Typography variant="body2" color="text.secondary">
          Это ваша главная панель Admin House.
        </Typography>
      </Box>

      {hasWorkspace && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <StatCard
            title="Категорий материалов"
            value={stats.categories}
            icon="solar:folder-2-bold"
            color="primary.main"
          />
          <StatCard
            title="Материалов"
            value={stats.materials}
            icon="solar:box-bold"
            color="success.main"
          />
          <StatCard
            title="Полей категорий"
            value={stats.fields}
            icon="solar:list-check-bold"
            color="warning.main"
          />
          <StatCard
            title="Workspace"
            value={
              (currentUser.creatorOfWorkspace ? 1 : 0) +
              (currentUser.memberOfWorkspaces?.length ?? 0)
            }
            icon="solar:buildings-bold"
            color="info.main"
          />
        </Grid>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Быстрые переходы
      </Typography>

      <Grid container spacing={2}>
        {QUICK_LINKS.map((link) => (
          <Grid item xs={12} sm={6} md={3} key={link.href}>
            <Card>
              <CardActionArea component={RouterLink} href={link.href} sx={{ p: 2 }}>
                <Stack spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      bgcolor: 'background.neutral',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: link.color,
                    }}
                  >
                    <Iconify icon={link.icon} width={28} />
                  </Box>
                  <Typography variant="subtitle1">{link.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {link.description}
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {isAdmin && (
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderColor: 'error.main', borderWidth: 1, borderStyle: 'solid' }}>
              <CardActionArea component={RouterLink} href={paths.profile.admin} sx={{ p: 2 }}>
                <Stack spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      bgcolor: 'background.neutral',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'error.main',
                    }}
                  >
                    <Iconify icon="solar:shield-user-bold" width={28} />
                  </Box>
                  <Typography variant="subtitle1">Админ-панель</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Управление пользователями и ключами регистрации
                  </Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>

      {!hasWorkspace && !isManager && (
        <Card sx={{ mt: 4, p: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h6">Workspace ещё не настроен</Typography>
            <Typography variant="body2" color="text.secondary">
              Вы пока не состоите ни в одном рабочем пространстве. Обратитесь к менеджеру вашего
              проекта, чтобы получить доступ.
            </Typography>
            <Box>
              <Button
                variant="contained"
                component={RouterLink}
                href={paths.profile.profile}
                startIcon={<Iconify icon="solar:user-id-bold" />}
              >
                Открыть профиль
              </Button>
            </Box>
          </Stack>
        </Card>
      )}
    </Container>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number | null;
  icon: string;
  color: string;
}) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1.5,
              bgcolor: 'background.neutral',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
            }}
          >
            <Iconify icon={icon} width={32} />
          </Box>
          <Box>
            <Typography variant="h4">{value === null ? '—' : value}</Typography>
            <Typography variant="caption" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Stack>
      </Card>
    </Grid>
  );
}
