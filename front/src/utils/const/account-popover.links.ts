import { UserRoles } from 'src/utils/const/user-roles.enum';

export const AccountPopoverLinks: AccountLink[] = [
  {
    label: 'Личный кабинет',
    linkTo: '/profile',
  },
  {
    label: 'Админ-панель',
    linkTo: '/profile/admin',
    userRoles: [UserRoles.ADMIN],
  },
  {
    label: 'Настройки',
    linkTo: '/profile/settings',
    userRoles: [UserRoles.ADMIN, UserRoles.MANAGER],
  },
];

export type AccountLink = {
  label: string;
  linkTo: string;
  userRoles?: UserRoles[];
};
