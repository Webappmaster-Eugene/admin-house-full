import { ICONS } from '@/shared/icons-app';
import { paths } from '@/utils/routes/paths';

import { UserRoles } from 'src/utils/const/user-roles.enum';

import { NavItems } from 'src/shared/nav-section/types';

// export type NavItem = {
//   title: string;
//   titleShort?: string;
//   caption?: string;
//   captionFull?: string;
//   path?: string;
//   icon?: JSX.Element;
//   roles?: UserRoles[];
//   children?: NavItem[];
// };
//
// export type NavSection = {
//   subheader: string;
//   roles?: UserRoles[];
//   items: NavItem[];
// }[];

export const NavData: NavItems = [
  // MAIN MENU
  {
    subheader: 'Справочник',
    roles: [UserRoles.MANAGER],
    items: [
      {
        title: 'Категории',
        titleShort: 'Категории',
        caption: 'Категории материалов в справочнике',
        captionFull: 'Все категории',
        path: paths.dashboard.categoryMaterials,
        needButtonLink: true,
        icon: ICONS.folder,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Материалы',
        titleShort: 'Материалы',
        caption: 'Материалы всех категорий',
        captionFull: 'Материалы по категориям',
        path: paths.dashboard.materials,
        icon: ICONS.analytics,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Поля материалов',
        titleShort: 'Поля',
        caption: 'Поля материалов для всех категорий',
        captionFull: 'Поля для категорий материалов и их соответствие',
        path: paths.dashboard.fields,
        icon: ICONS.file,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Сметы',
        titleShort: 'Сметы',
        caption: 'Сметы проектов',
        captionFull: 'Сметы проектов: иерархические документы со строками разных типов и экспортом в Excel',
        path: paths.dashboard.estimates,
        icon: ICONS.invoice,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Единички',
        titleShort: 'Единички',
        caption: 'Шаблоны комплексных единиц',
        captionFull: 'Шаблоны комплексных единиц работ (материал + работа на 1 ед.) для использования в сметах',
        path: paths.dashboard.unitTemplates,
        icon: ICONS.kanban,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Пироги',
        titleShort: 'Пироги',
        caption: 'Шаблоны многослойных конструкций',
        captionFull: 'Шаблоны многослойных конструкций (стены, полы, перекрытия) для использования в сметах',
        path: paths.dashboard.constructionPies,
        icon: ICONS.banking,
        roles: [UserRoles.MANAGER],
      },
      // {
      //   title: 'Характеристики',
      //   titleShort: 'Харак-ки',
      //   caption:
      //     'Характеристики/свойства материалов в соответствии с требуемыми в категории полями',
      //   captionFull:
      //     'Конкретные характеристики/свойства для всех материалов в соответствии с требуемыми в категории полями',
      //   path: paths.dashboard.characteristics,
      //   icon: ICONS.blank,
      //   roles: [UserRoles.MANAGER],
      // },
    ],
  },

  // MANAGEMENT
  {
    subheader: 'Управление',
    items: [
      {
        title: 'Руководство',
        titleShort: 'Руководство',
        caption: 'Как пользоваться приложением',
        captionFull: 'Пошаговое руководство: справочник, шаблоны, сметы, экспорт в Excel',
        path: paths.dashboard.guide,
        icon: ICONS.tour,
        roles: [UserRoles.MANAGER],
      },
      {
        title: 'Личный кабинет',
        titleShort: 'Кабинет',

        path: paths.profile.profile,
        icon: ICONS.user,
        children: [
          {
            title: 'Мой профиль',
            titleShort: 'Мой профиль',
            // caption: 'Профиль текущего пользователя',
            captionFull: 'Профиль текущего пользователя',
            path: paths.profile.profile,
          },
          {
            title: 'Админ-панель',
            titleShort: 'Админ-панель',
            // caption: 'Панель администратора',
            captionFull: 'Панель администратора (только для админа)',
            path: paths.profile.admin,
            roles: [UserRoles.ADMIN],
          },
          {
            title: 'Настройки',
            titleShort: 'Настройки',
            // caption: 'Настройки приложения',
            captionFull: 'Настройки приложения',
            path: paths.profile.settings,
          },
        ],
      },
    ],
  },
];
