import { ICONS } from '@/shared/icons-app';
import { paths } from '@/utils/routes/paths';

export function useNavData() {
  const data = [
    // OVERVIEW
    {
      subheader: 'Основное меню',
      items: [
        { title: 'Материалы', path: paths.dashboard.materials, icon: ICONS.analytics },
        { title: 'Поля материалов', path: paths.dashboard.fields, icon: ICONS.file },
        {
          title: 'Характеристики материалов',
          path: paths.dashboard.characteristics,
          icon: ICONS.folder,
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
            { title: 'Админ-панель', path: paths.profile.admin },
            { title: 'Настройки', path: paths.profile.settings },
          ],
        },
      ],
    },
  ];

  return data;
}
