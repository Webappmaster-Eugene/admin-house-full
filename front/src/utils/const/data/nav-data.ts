import { ICONS } from '@/shared/icons-app';
import { paths } from '@/utils/routes/paths';

import { UserRoles } from 'src/utils/const/user-roles.enum';

export const NavData = [
  // MAIN MENU
  {
    subheader: 'Справочник',
    roles: [UserRoles.MANAGER],
    items: [
      {
        title: 'Материалы',
        path: paths.dashboard.materials,
        icon: ICONS.analytics,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Поля материалов',
        path: paths.dashboard.fields,
        icon: ICONS.file,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Характеристики материалов',
        path: paths.dashboard.characteristics,
        icon: ICONS.folder,
        roles: [UserRoles.MANAGER],
      },
    ],
  },

  // MANAGEMENT
  {
    subheader: 'Управление',
    items: [
      {
        title: 'Личный кабинет',
        path: paths.profile.profile,
        icon: ICONS.user,
        children: [
          { title: 'Мой профиль', path: paths.profile.profile },
          { title: 'Админ-панель', path: paths.profile.admin, roles: [UserRoles.ADMIN] },
          { title: 'Настройки', path: paths.profile.settings },
        ],
      },
    ],
  },
];
