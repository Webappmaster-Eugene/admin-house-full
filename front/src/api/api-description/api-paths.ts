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
  ADDITIONS: [];
  EFFECTS: [];
}

export interface IAPI_ROUTE extends IAPI_ROUTE_CLASSIC {
  SUB_PAGES: { [key: string]: IAPI_ROUTE_CLASSIC };
}

export interface IAPI_PATHS {
  ROOT_PATH: string;
  DESCRIPTION: string;
  PAGES: { [key: string]: IAPI_ROUTE };
}

export const API_PATHS: IAPI_PATHS = {
  ROOT_PATH: 'https://alibaba.hhos.ru',
  DESCRIPTION: 'Все роуты на фронте приложения House Admin',
  PAGES: {
    // DOC /
    DASHBOARD: {
      FULL_PATH: '/dashboard',
      DESCRIPTION: 'Главная страница дашборда',
      ROLES_CAN_ACCESS: [],
      GUARDS: [],
      TYPE_RENDER: TYPE_RENDER.SERVER,
      SERVER_ACTIONS: [],
      FEATURES: [],
      ADDITIONS: [],
      EFFECTS: [],
      SUB_PAGES: {
        MATERIALS: {
          FULL_PATH: '/dashboard/materials',
          DESCRIPTION: 'Получить информацию о материалах',
          ROLES_CAN_ACCESS: [],
          GUARDS: [],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          ADDITIONS: [],
          EFFECTS: [],
        },
        FIELDS: {
          FULL_PATH: '/dashboard/fields',
          DESCRIPTION: 'Получить информацию о полях для категорий материалов',
          ROLES_CAN_ACCESS: [],
          GUARDS: [],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          ADDITIONS: [],
          EFFECTS: [],
        },
        CHARACTERISTICS: {
          FULL_PATH: '/dashboard/characteristics',
          DESCRIPTION: 'Получить информацию о характеристиках материала',
          ROLES_CAN_ACCESS: [],
          GUARDS: [],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          ADDITIONS: [],
          EFFECTS: [],
        },
      },
    },
    PROFILE: {
      FULL_PATH: '/profile',
      DESCRIPTION: 'Получить информацию о профиле',
      ROLES_CAN_ACCESS: [],
      GUARDS: [],
      TYPE_RENDER: TYPE_RENDER.SERVER,
      SERVER_ACTIONS: [],
      FEATURES: [],
      ADDITIONS: [],
      EFFECTS: [],
      SUB_PAGES: {
        SETTINGS: {
          FULL_PATH: '/profile/settings',
          DESCRIPTION: 'Настройки приложения',
          ROLES_CAN_ACCESS: [],
          GUARDS: [],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          ADDITIONS: [],
          EFFECTS: [],
        },
        ADMIN: {
          FULL_PATH: '/profile/admin',
          DESCRIPTION: 'Админ-часть приложения',
          ROLES_CAN_ACCESS: [],
          GUARDS: [],
          TYPE_RENDER: TYPE_RENDER.SERVER,
          SERVER_ACTIONS: [],
          FEATURES: [],
          ADDITIONS: [],
          EFFECTS: [],
        },
      },
    },
  },
};
