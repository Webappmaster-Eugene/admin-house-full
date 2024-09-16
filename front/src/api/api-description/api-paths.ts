import { GUARDS } from 'src/api/api-description/guards';
import { FEATURES } from 'src/api/api-description/features';
import { USER_ROLES } from 'src/api/api-description/user-roles';
import { TYPE_RENDER } from 'src/api/api-description/type-render';

export interface IAPI_ROUTE_CLASSIC {
  FULL_PATH: string;
  DESCRIPTION: string;
  FEATURES: FEATURES[];
  ROLES_CAN_ACCESS: USER_ROLES[];
  GUARDS: GUARDS[];
  TYPE_RENDER: TYPE_RENDER;
  SERVER_ACTIONS: string[];
  EFFECTS: [];
}

export interface IAPI_ROUTE extends IAPI_ROUTE_CLASSIC {
  SUB_PAGES: { [key: string]: IAPI_ROUTE_CLASSIC };
}

export interface IAPI_PATHS {
  ROOT_PATH: string;
  DESCRIPTION: string;
  FEATURES: FEATURES[];
  ROLES_CAN_ACCESS: USER_ROLES[];
  GUARDS: GUARDS[];
  TYPE_RENDER: TYPE_RENDER;
  SERVER_ACTIONS: string[];
  EFFECTS: [];
  PAGES: { [key: string]: IAPI_ROUTE };
}

export const API_PATHS: IAPI_PATHS = {
  // DOC /
  ROOT_PATH: 'https://alibaba.hhos.ru',
  DESCRIPTION: 'Все роуты на фронте приложения House Admin',
  ROLES_CAN_ACCESS: [],
  GUARDS: [GUARDS.AUTH_GUARD],
  TYPE_RENDER: TYPE_RENDER.SERVER,
  SERVER_ACTIONS: [],
  FEATURES: [FEATURES.NEXT_REDIRECT],
  EFFECTS: [],
  PAGES: {
    // DOC dashboard
    DASHBOARD: {
      FULL_PATH: '/dashboard',
      DESCRIPTION: 'Главная страница дашбордов',
      ROLES_CAN_ACCESS: [],
      GUARDS: [GUARDS.AUTH_GUARD],
      TYPE_RENDER: TYPE_RENDER.SERVER,
      SERVER_ACTIONS: [],
      FEATURES: [],
      EFFECTS: [],
      SUB_PAGES: {
        MATERIALS: {
          FULL_PATH: '/dashboard/materials',
          DESCRIPTION: 'Получить информацию о материалах',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['getAllMaterials'],
          FEATURES: [],
          EFFECTS: [],
        },
        FIELDS: {
          FULL_PATH: '/dashboard/fields',
          DESCRIPTION: 'Получить информацию о полях для категорий материалов',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['getAllFields'],
          FEATURES: [],
          EFFECTS: [],
        },
        CHARACTERISTICS: {
          FULL_PATH: '/dashboard/characteristics',
          DESCRIPTION: 'Получить информацию о характеристиках материала',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['getAllCharacteristics'],
          FEATURES: [],
          EFFECTS: [],
        },
      },
    },
    // DOC dashboard
    PROFILE: {
      FULL_PATH: '/profile',
      DESCRIPTION: 'Получить информацию о профиле',
      ROLES_CAN_ACCESS: [],
      GUARDS: [GUARDS.AUTH_GUARD],
      TYPE_RENDER: TYPE_RENDER.SERVER,
      SERVER_ACTIONS: ['getCurrentUser'],
      FEATURES: [],
      EFFECTS: [],
      SUB_PAGES: {
        SETTINGS: {
          FULL_PATH: '/profile/settings',
          DESCRIPTION: 'Настройки приложения',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          EFFECTS: [],
        },
        ADMIN: {
          FULL_PATH: '/profile/admin',
          DESCRIPTION: 'Админ-часть приложения',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['getAllUsers'],
          FEATURES: [],
          EFFECTS: [],
        },
      },
    },
    // DOC auth
    AUTH: {
      FULL_PATH: '/auth',
      DESCRIPTION: 'Логин и вход',
      ROLES_CAN_ACCESS: [],
      GUARDS: [GUARDS.GUEST_GUARD],
      TYPE_RENDER: TYPE_RENDER.SERVER,
      SERVER_ACTIONS: [],
      FEATURES: [FEATURES.NEXT_REDIRECT],
      EFFECTS: [],
      SUB_PAGES: {
        LOGIN: {
          FULL_PATH: '/auth/login',
          DESCRIPTION: 'Войти в приложение',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.GUEST_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['login'],
          FEATURES: [FEATURES.CHANGING_COOKIE],
          EFFECTS: [],
        },
        REGISTER: {
          FULL_PATH: '/auth/register',
          DESCRIPTION: 'Регистрация в приложении',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['register'],
          FEATURES: [FEATURES.CHANGING_COOKIE],
          EFFECTS: [],
        },
        REGISTER_WITH_ROLE: {
          FULL_PATH: '/auth/register/with-role-key',
          DESCRIPTION: 'Регистрация в приложении',
          ROLES_CAN_ACCESS: [],
          GUARDS: [GUARDS.AUTH_GUARD],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: ['register'],
          FEATURES: [FEATURES.CHANGING_COOKIE],
          EFFECTS: [],
        },
      },
    },
  },
};
