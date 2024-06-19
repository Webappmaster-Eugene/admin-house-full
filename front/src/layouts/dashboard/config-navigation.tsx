import { paths } from 'src/utils/routes/paths';

import { ICONS } from 'src/components/icons-app';

export function useNavData() {
  const data = [
    // OVERVIEW
    {
      subheader: 'Основное меню',
      items: [
        { title: 'Справочник материалов', path: paths.dashboard.root, icon: ICONS.analytics },
        { title: 'Справочник категорий', path: paths.dashboard.two, icon: ICONS.file },
        {
          title: 'Справочник полей',
          path: paths.dashboard.three,
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
          path: paths.dashboard.group.root,
          icon: ICONS.user,
          children: [
            { title: 'Настройки профиля', path: paths.dashboard.group.root },
            { title: 'Админ-возможности', path: paths.dashboard.group.five },
            { title: 'Информация о ПО', path: paths.dashboard.group.six },
          ],
        },
      ],
    },
  ];

  return data;
}
