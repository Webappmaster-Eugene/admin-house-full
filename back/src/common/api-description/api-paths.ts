import { AppInfoUpdateRequestDto } from 'src/modules/app-info/dto/controller/update-app-info.dto';
import { AppInfoGetResponseDto } from 'src/modules/app-info/dto/controller/get-app-info.dto';
import { GUARDS } from 'src/common/api-description/guards';
import { USER_ROLES } from 'src/common/api-description/user-roles';
import { AuthRegisterRequestDto, AuthRegisterResponseDto } from 'src/modules/auth/dto/controller/auth.register.dto';
import {
  AuthRegisterWithRoleRequestDto,
  AuthRegisterWithRoleResponseDto,
} from 'src/modules/auth/dto/controller/auth.register-with-role.dto';
import { SIDE_EFFECTS } from 'src/common/api-description/side-effects';
import { METHODS } from 'src/common/api-description/method.enum';
import { ADDITIONAL_INFO } from 'src/common/api-description/additional-request-info';
import { FEATURES } from 'src/common/api-description/features';
import { AuthRefreshKeysResponseDto } from 'src/modules/auth/dto/controller/auth.refresh-keys.dto';
import { AuthLoginRequestDto, AuthLoginResponseDto } from 'src/modules/auth/dto/controller/auth.login.dto';
import { AuthGenerateKeyRequestDto, AuthGenerateKeyResponseDto } from 'src/modules/auth/dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from 'src/modules/auth/dto/controller/auth.get-key.dto';
import { UserGetResponseDto } from 'src/modules/user/dto/controller/get-user.dto';
import { QueryParamsAll } from 'src/common/api-description/query-params-all';
import { UserCreateRequestDto, UserCreateResponseDto } from 'src/modules/user/dto/controller/create-user.dto';
import { UserUpdateRequestDto, UserUpdateResponseDto } from 'src/modules/user/dto/controller/update-user.dto';
import { UserDeleteResponseDto } from 'src/modules/user/dto/controller/delete-user.dto';
import { UserAddToWorkspaceRequestDto, UserAddToWorkspaceResponseDto } from 'src/modules/user/dto/controller/add-to-workspace.dto';
import { UserAddToOrganizationRequestDto, UserAddToOrganizationResponseDto } from 'src/modules/user/dto/controller/add-to-organization.dto';
import { UserAddToProjectRequestDto, UserAddToProjectResponseDto } from 'src/modules/user/dto/controller/add-to-project.dto';
import { WorkspaceGetResponseDto } from 'src/modules/workspace/dto/controller/get-workspace.dto';
import { WorkspaceGetAllResponseDto } from 'src/modules/workspace/dto/controller/get-all-workspaces.dto';
import { WorkspaceCreateRequestDto, WorkspaceCreateResponseDto } from 'src/modules/workspace/dto/controller/create-workspace.dto';
import { WorkspaceUpdateRequestDto, WorkspaceUpdateResponseDto } from 'src/modules/workspace/dto/controller/update-workspace.dto';
import { WorkspaceDeleteResponseDto } from 'src/modules/workspace/dto/controller/delete-workspace.dto';
import {
  WorkspaceChangeOwnerRequestDto,
  WorkspaceChangeOwnerResponseDto,
} from 'src/modules/workspace/dto/controller/change-owner-workspace.dto';
import { OrganizationGetResponseDto } from 'src/modules/organization/dto/controller/get-organization.dto';
import { OrganizationGetAllResponseDto } from 'src/modules/organization/dto/controller/get-all-organizations.dto';
import { OrganizationCreateResponseDto } from 'src/modules/organization/dto/controller/create-organization.dto';
import {
  OrganizationUpdateRequestDto,
  OrganizationUpdateResponseDto,
} from 'src/modules/organization/dto/controller/update-organization.dto';
import { OrganizationDeleteResponseDto } from 'src/modules/organization/dto/controller/delete-organization.dto';
import { ProjectGetResponseDto } from 'src/modules/project/dto/controller/get-project.dto';
import { ProjectGetAllResponseDto } from 'src/modules/project/dto/controller/get-all-projects.dto';
import { ProjectCreateRequestDto, ProjectCreateResponseDto } from 'src/modules/project/dto/controller/create-project.dto';
import { ProjectUpdateRequestDto, ProjectUpdateResponseDto } from 'src/modules/project/dto/controller/update-project.dto';
import { ProjectDeleteResponseDto } from 'src/modules/project/dto/controller/delete-project.dto';
import { HandbookGetResponseDto } from 'src/modules/handbook/dto/controller/get-handbook.dto';
import { HandbookGetAllResponseDto } from 'src/modules/handbook/dto/controller/get-all-handbooks.dto';
import { HandbookCreateRequestDto, HandbookCreateResponseDto } from 'src/modules/handbook/dto/controller/create-handbook.dto';
import { HandbookUpdateRequestDto, HandbookUpdateResponseDto } from 'src/modules/handbook/dto/controller/update-handbook.dto';
import { HandbookDeleteResponseDto } from 'src/modules/handbook/dto/controller/delete-handbook.dto';
import { RoleGetResponseDto } from 'src/modules/roles/dto/controller/get-role.dto';
import { RoleGetAllResponseDto } from 'src/modules/roles/dto/controller/get-all-roles.dto';
import { RoleCreateRequestDto, RoleCreateResponseDto } from 'src/modules/roles/dto/controller/create-role.dto';
import { RoleUpdateRequestDto, RoleUpdateResponseDto } from 'src/modules/roles/dto/controller/update-role.dto';
import { RoleDeleteResponseDto } from 'src/modules/roles/dto/controller/delete-role.dto';
import { GlobalCategoryMaterialGetResponseDto } from 'src/modules/global-category-material/dto/controller/get-global-category-material.dto';
import { GlobalCategoryMaterialGetAllResponseDto } from 'src/modules/global-category-material/dto/controller/get-all-global-category-materials.dto';
import {
  GlobalCategoryMaterialCreateRequestDto,
  GlobalCategoryMaterialCreateResponseDto,
} from 'src/modules/global-category-material/dto/controller/create-global-category-material.dto';
import {
  GlobalCategoryMaterialUpdateRequestDto,
  GlobalCategoryMaterialUpdateResponseDto,
} from 'src/modules/global-category-material/dto/controller/update-global-category-material.dto';
import { GlobalCategoryMaterialDeleteResponseDto } from 'src/modules/global-category-material/dto/controller/delete-global-category-material.dto';
import { StatusResourceGetResponseDto } from 'src/modules/status-resource/dto/controller/get-status-resource.dto';
import { StatusResourceGetAllResponseDto } from 'src/modules/status-resource/dto/controller/get-all-status-resources.dto';
import {
  StatusResourceUpdateRequestDto,
  StatusResourceUpdateResponseDto,
} from 'src/modules/status-resource/dto/controller/update-status-resource.dto';
import { StatusResourceCreateResponseDto } from 'src/modules/status-resource/dto/controller/create-status-resource.dto';
import { StatusResourceDeleteResponseDto } from 'src/modules/status-resource/dto/controller/delete-status-resource.dto';
import { CategoryMaterialGetResponseDto } from 'src/modules/category-material/dto/controller/get-category-material.dto';
import { CategoryMaterialGetAllResponseDto } from 'src/modules/category-material/dto/controller/get-all-category-materials.dto';
import {
  CategoryMaterialUpdateRequestDto,
  CategoryMaterialUpdateResponseDto,
} from 'src/modules/category-material/dto/controller/update-category-material.dto';
import { CategoryMaterialCreateRequestDto } from 'src/modules/category-material/dto/controller/create-category-material.dto';
import { CategoryMaterialDeleteResponseDto } from 'src/modules/category-material/dto/controller/delete-category-material.dto';
import { ResponsiblePartnerProducerGetResponseDto } from 'src/modules/responsible-partner-producer/dto/controller/get-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerGetAllResponseDto } from 'src/modules/responsible-partner-producer/dto/controller/get-all-responsible-partner-producers.dto';
import {
  ResponsiblePartnerProducerCreateRequestDto,
  ResponsiblePartnerProducerCreateResponseDto,
} from 'src/modules/responsible-partner-producer/dto/controller/create-responsible-partner-producer.dto';
import {
  ResponsiblePartnerProducerUpdateRequestDto,
  ResponsiblePartnerProducerUpdateResponseDto,
} from 'src/modules/responsible-partner-producer/dto/controller/update-responsible-partner-producer.dto';
import { ResponsiblePartnerProducerDeleteResponseDto } from 'src/modules/responsible-partner-producer/dto/controller/delete-responsible-partner-producer.dto';
import { FieldTypeGetResponseDto } from 'src/modules/field-type/dto/controller/get-field-type.dto';
import { FieldTypeGetAllResponseDto } from 'src/modules/field-type/dto/controller/get-all-field-types.dto';
import { FieldTypeCreateRequestDto, FieldTypeCreateResponseDto } from 'src/modules/field-type/dto/controller/create-field-type.dto';
import { FieldTypeUpdateRequestDto, FieldTypeUpdateResponseDto } from 'src/modules/field-type/dto/controller/update-field-type.dto';
import { FieldTypeDeleteResponseDto } from 'src/modules/field-type/dto/controller/delete-field-type.dto';
import { FieldUnitMeasurementGetResponseDto } from 'src/modules/field-unit-measurement/dto/controller/get-field-unit-measurement.dto';
import { FieldUnitMeasurementGetAllResponseDto } from 'src/modules/field-unit-measurement/dto/controller/get-all-field-unit-measurements.dto';
import {
  FieldUnitMeasurementCreateRequestDto,
  FieldUnitMeasurementCreateResponseDto,
} from 'src/modules/field-unit-measurement/dto/controller/create-field-unit-measurement.dto';
import {
  FieldUnitMeasurementUpdateRequestDto,
  FieldUnitMeasurementUpdateResponseDto,
} from 'src/modules/field-unit-measurement/dto/controller/update-field-unit-measurement.dto';
import { FieldUnitMeasurementDeleteResponseDto } from 'src/modules/field-unit-measurement/dto/controller/delete-field-unit-measurement.dto';
import { FieldVariantsForSelectorFieldTypeGetAllResponseDto } from 'src/modules/field-variants-for-selector-field-type/dto/controller/get-all-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeGetResponseDto } from 'src/modules/field-variants-for-selector-field-type/dto/controller/get-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeCreateRequestDto,
  FieldVariantsForSelectorFieldTypeCreateResponseDto,
} from 'src/modules/field-variants-for-selector-field-type/dto/controller/create-field-variants-for-selector-field-type.dto';
import {
  FieldVariantsForSelectorFieldTypeUpdateRequestDto,
  FieldVariantsForSelectorFieldTypeUpdateResponseDto,
} from 'src/modules/field-variants-for-selector-field-type/dto/controller/update-field-variants-for-selector-field-type.dto';
import { FieldVariantsForSelectorFieldTypeDeleteResponseDto } from 'src/modules/field-variants-for-selector-field-type/dto/controller/delete-field-variants-for-selector-field-type.dto';
import { StatusApproveGetResponseDto } from 'src/modules/status-approve/dto/controller/get-status-approve.dto';
import { StatusApproveGetAllResponseDto } from 'src/modules/status-approve/dto/controller/get-all-status-approve.dto';
import {
  StatusApproveUpdateRequestDto,
  StatusApproveUpdateResponseDto,
} from 'src/modules/status-approve/dto/controller/update-status-approve.dto';
import { StatusApproveCreateResponseDto } from 'src/modules/status-approve/dto/controller/create-status-approve.dto';
import { StatusApproveDeleteResponseDto } from 'src/modules/status-approve/dto/controller/delete-status-approve.dto';
import { MaterialGetResponseDto } from 'src/modules/material/dto/controller/get-material.dto';
import { MaterialGetAllResponseDto } from 'src/modules/material/dto/controller/get-all-materials.dto';
import { MaterialCreateRequestDto, MaterialCreateResponseDto } from 'src/modules/material/dto/controller/create-material.dto';
import { MaterialUpdateRequestDto, MaterialUpdateResponseDto } from 'src/modules/material/dto/controller/update-material.dto';
import { MaterialDeleteResponseDto } from 'src/modules/material/dto/controller/delete-material.dto';
import { CharacteristicsMaterialGetResponseDto } from 'src/modules/characteristics-material/dto/controller/get-characteristics-material.dto';
import { CharacteristicsMaterialGetAllResponseDto } from 'src/modules/characteristics-material/dto/controller/get-all-characteristics-materials.dto';
import {
  CharacteristicsMaterialCreateRequestDto,
  CharacteristicsMaterialCreateResponseDto,
} from 'src/modules/characteristics-material/dto/controller/create-characteristics-material.dto';
import {
  CharacteristicsMaterialUpdateRequestDto,
  CharacteristicsMaterialUpdateResponseDto,
} from 'src/modules/characteristics-material/dto/controller/update-characteristics-material.dto';
import { CharacteristicsMaterialDeleteResponseDto } from 'src/modules/characteristics-material/dto/controller/delete-characteristics-material.dto';

interface IAPI_ROUTE {
  METHOD: METHODS;
  FULL_PATH: string;
  DESCRIPTION: string;
  ROLES: USER_ROLES[];
  MIDDLEWARES: {
    GUARDS: GUARDS[];
    INTERCEPTORS: string[];
    PIPES: string[];
    FILTERS: string[];
  };
  REQUEST_INFO: {
    HEADERS: string[];
    PARAMS: string[];
    QUERY_PARAMS: Array<typeof QueryParamsAll | string>;
    USER_FROM_JWT: boolean;
    BODY: object | null;
    ADDITIONS: ADDITIONAL_INFO[];
  };
  RESPONSE: object;
  EFFECTS: SIDE_EFFECTS[];
}

export interface IAPI_ENTITIES {
  ROOT_PATH: string;
  DESCRIPTION_ENTITY: string;
  FEATURES: FEATURES[];
  ROUTES: { [key: string]: IAPI_ROUTE };
}

export interface IAPI_PATHS {
  ROOT_APP_PATH: string;
  SWAGGER_DOCS_PATH: string;
  DESCRIPTION: string;
  ENTITIES: { [key: string]: IAPI_ENTITIES };
}

export const API_PATHS: IAPI_PATHS = {
  ROOT_APP_PATH: 'https://api.alibaba.hhos.ru/api/docs',
  SWAGGER_DOCS_PATH: 'https://api.alibaba.hhos.ru/api/v1.0',
  DESCRIPTION: 'Все роуты приложения House Admin',
  ENTITIES: {
    //DOC app-info
    APP_INFO: {
      ROOT_PATH: 'app-info',
      DESCRIPTION_ENTITY: 'Информация о приложении в целом',
      FEATURES: [FEATURES.CQRS, FEATURES.SEEDS],
      ROUTES: {
        GET_APP_INFO: {
          METHOD: METHODS.GET,
          FULL_PATH: 'app-info',
          DESCRIPTION: 'Получить информацию о приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: AppInfoGetResponseDto,
          EFFECTS: [],
        },
        UPDATE_APP_INFO: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'app-info',
          DESCRIPTION: 'Обновить информацию о приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AppInfoUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: AppInfoGetResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC auth
    AUTH: {
      ROOT_PATH: 'auth',
      DESCRIPTION_ENTITY: 'Роуты для авторизации и регистрации',
      FEATURES: [],
      ROUTES: {
        REGISTER: {
          METHOD: METHODS.POST,
          FULL_PATH: 'auth/register',
          DESCRIPTION: 'Регистрация пользователя только с дефолтной ролью CUSTOMER',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthRegisterRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS, ADDITIONAL_INFO.RESPONSE],
          },
          RESPONSE: AuthRegisterResponseDto,
          EFFECTS: [SIDE_EFFECTS.AUTH_COOKIE],
        },
        REGISTER_WITH_ROLE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'auth/register/with-role/:roleId/:registerWithRoleKey',
          DESCRIPTION: 'Регистрация пользователя с любой ролью, но в том числе с дефолтной ролью CUSTOMER',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleId', 'registerWithRoleKey'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthRegisterWithRoleRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS, ADDITIONAL_INFO.RESPONSE],
          },
          RESPONSE: AuthRegisterWithRoleResponseDto,
          EFFECTS: [SIDE_EFFECTS.AUTH_COOKIE, SIDE_EFFECTS.GENERATE_STRICT_ADMIN_KEY, SIDE_EFFECTS.CREATE_MANAGER],
        },
        REFRESH_KEYS: {
          METHOD: METHODS.POST,
          FULL_PATH: 'auth/refresh-keys',
          DESCRIPTION: 'Обновить пару ключей в случае, если access-token устарел',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.REFRESH_KEY_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleId', 'registerWithRoleKey'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthRegisterWithRoleRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS, ADDITIONAL_INFO.REQUEST, ADDITIONAL_INFO.RESPONSE],
          },
          RESPONSE: AuthRefreshKeysResponseDto,
          EFFECTS: [SIDE_EFFECTS.AUTH_COOKIE],
        },
        LOGIN: {
          METHOD: METHODS.POST,
          FULL_PATH: 'auth/login',
          DESCRIPTION: 'Войти под пользователем с любой ролью',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthLoginRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS, ADDITIONAL_INFO.RESPONSE],
          },
          RESPONSE: AuthLoginResponseDto,
          EFFECTS: [SIDE_EFFECTS.AUTH_COOKIE],
        },
        GENERATE_STRICT_ADMIN_KEY: {
          METHOD: METHODS.POST,
          FULL_PATH: 'auth/strict-admin-key/generate',
          DESCRIPTION: 'Сгенерировать ключ для регистрации пользователя с любой недефолтной ролью (кроме CUSTOMER)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthGenerateKeyRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: AuthGenerateKeyResponseDto,
          EFFECTS: [SIDE_EFFECTS.GENERATE_STRICT_ADMIN_KEY],
        },
        GET_STRICT_ADMIN_KEY: {
          METHOD: METHODS.GET,
          FULL_PATH: 'auth/strict-admin-key/get',
          DESCRIPTION: 'Получить ключ для регистрации пользователя с любой недефолтной ролью (кроме CUSTOMER)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: AuthGenerateKeyRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: AuthGetKeyResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC role/:roleId
    ROLE: {
      ROOT_PATH: 'role',
      DESCRIPTION_ENTITY: 'Роуты для работы с ролями пользователей системы',
      FEATURES: [FEATURES.REDIS, FEATURES.SEEDS],
      ROUTES: {
        GET_BY_ID: {
          METHOD: METHODS.GET,
          FULL_PATH: 'by-id/:roleId',
          DESCRIPTION: 'Получение одной роли по ее числовому id (не uuid идентификатору)',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleGetResponseDto,
          EFFECTS: [],
        },
        GET_BY_VALUE: {
          METHOD: METHODS.GET,
          FULL_PATH: 'by-name/:roleName',
          DESCRIPTION: 'Получение одной роли по ее имени',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleName'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'by-name/:roleName',
          DESCRIPTION: 'Получение всех ролей приложения',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'role',
          DESCRIPTION: 'Создание одной роли',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: RoleCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'role/:roleUuid',
          DESCRIPTION: 'Обновление одной роли',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleUuid'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: RoleUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'role/:roleUuid',
          DESCRIPTION: 'Удаление одной роли',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['roleUuid'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: RoleDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC user/:userId
    USER: {
      ROOT_PATH: 'user',
      DESCRIPTION_ENTITY: 'Роуты для работы с пользователями системы',
      FEATURES: [FEATURES.REDIS],
      ROUTES: {
        GET_BY_ID: {
          METHOD: METHODS.GET,
          FULL_PATH: 'user/by-id/:userId',
          DESCRIPTION: 'Получение одного пользователя по его идентификатору',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_AFFILATION_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['userId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserGetResponseDto,
          EFFECTS: [],
        },
        GET_BY_EMAIL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'user/by-email/:email',
          DESCRIPTION: 'Получение одного пользователя по его почте',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_AFFILATION_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['email'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'user/by-email/:email',
          DESCRIPTION: 'Получение одного пользователя по его почте',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['email'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserGetResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'user',
          DESCRIPTION: 'Создание одного пользователя (только с дефолтной ролью CUSTOMER)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: UserCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'user',
          DESCRIPTION: 'Обновление любого пользователя',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_AFFILATION_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['userId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: UserUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'user/:userId',
          DESCRIPTION: 'Удаление любого пользователя',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['userId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserDeleteResponseDto,
          EFFECTS: [],
        },
        GET_CURRENT_USER: {
          METHOD: METHODS.GET,
          FULL_PATH: 'user/me',
          DESCRIPTION: 'Получить текущего пользователя',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserGetResponseDto,
          EFFECTS: [],
        },
        ADD_USER_TO_WORKSPACE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'user/add-to-workspace/workspace/:workspaceId',
          DESCRIPTION: 'Добавить пользователя в рабочую область (по workspaceId) от лица админа или менеджера этого workspace',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: UserAddToWorkspaceRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserAddToWorkspaceResponseDto,
          EFFECTS: [],
        },
        ADD_USER_TO_ORGANIZATION: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'add-to-organization/workspace/:workspaceId/organization/:organizationId',
          DESCRIPTION:
            'Добавить пользователя,который уже добавлен в соответствующую рабочую область (по workspaceId) в организацию внутри workspace (по organizationId) от лица админа или менеджера этого workspace',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId', 'organizationId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: UserAddToOrganizationRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserAddToOrganizationResponseDto,
          EFFECTS: [],
        },
        ADD_USER_TO_PROJECT: {
          METHOD: METHODS.PUT,
          FULL_PATH: '/add-to-project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
          DESCRIPTION:
            'Добавить пользователя,который уже добавлен в соответствующую рабочую область (по workspaceId) и организацию внутри workspace (по organizationId) в проект внутри project (по projectId) от лица админа или менеджера этого workspace',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId', 'organizationId', 'projectId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: UserAddToProjectRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: UserAddToProjectResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC workspace/:workspaceId
    WORKSPACE: {
      ROOT_PATH: 'workspace',
      DESCRIPTION_ENTITY: 'Роуты для работы с рабочими пространствами',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'workspace/:workspaceId',
          DESCRIPTION: 'Получить один workspace по workspaceId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'workspace',
          DESCRIPTION: 'Получить все существующие в системе workspaces',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'workspace',
          DESCRIPTION: 'Создать новое рабочее пространство от лица админа',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: WorkspaceCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'workspace/:workspaceId',
          DESCRIPTION: 'Обновить рабочее пространство от лица админа или менеджера workspace',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: ['workspaceId'],
            USER_FROM_JWT: false,
            BODY: WorkspaceUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'workspace/:workspaceId',
          DESCRIPTION: 'Удалить рабочее пространство от лица админа',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: ['workspaceId'],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceDeleteResponseDto,
          EFFECTS: [],
        },
        CHANGE_OWNER_OF_WORKSPACE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'workspace/change-owner/:workspaceId',
          DESCRIPTION: 'Изменить владельца рабочего пространства от лица админа (его расположение, логику и т.п.)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.IS_MANAGER_IN_BODY],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: ['workspaceId'],
            USER_FROM_JWT: false,
            BODY: WorkspaceChangeOwnerRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: WorkspaceChangeOwnerResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC organization/workspace/:workspaceId/organization/:organizationId
    ORGANIZATION: {
      ROOT_PATH: 'organization',
      DESCRIPTION_ENTITY: 'Роуты для работы с организациями внутри рабочих пространств',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'organization/workspace/:workspaceId/organization/:organizationId',
          DESCRIPTION: 'Получить один organization внутри workspace (по workspaceId) по organizationId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['organizationId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'organization/get-all-organizations',
          DESCRIPTION: 'Получить все organization в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_WORKSPACE: {
          METHOD: METHODS.GET,
          FULL_PATH: 'organization/workspace/:workspaceId/get-all-in-workspace',
          DESCRIPTION: 'Получить все organization внутри одного workspace по workspaceId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'organization/workspace/:workspaceId',
          DESCRIPTION: 'Создать одну organization внутри workspace по workspaceId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: OrganizationUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'organization/workspace/:workspaceId/organization/:organizationId',
          DESCRIPTION: 'Изменить одну organization внутри workspace по organizationId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['organizationId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: OrganizationUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'organization/workspace/:workspaceId/organization/:organizationId',
          DESCRIPTION: 'Удалить одну organization внутри workspace по organizationId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['organizationId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: OrganizationDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC project/workspace/:workspaceId/organization/:organizationId/project/:projectId
    PROJECT: {
      ROOT_PATH: 'project',
      DESCRIPTION_ENTITY: 'Роуты для работы с проектами внутри рабочих пространств внутри организаций',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
          DESCRIPTION: 'Получить один project внутри workspace (по workspaceId) внутри organization (по organizationId) по projectId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['projectId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'project',
          DESCRIPTION: 'Получить все project приложения',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_WORKSPACE: {
          METHOD: METHODS.GET,
          FULL_PATH: 'project/workspace/:workspaceId/get-all-in-workspace',
          DESCRIPTION: 'Получить все project внутри workspace по workspaceId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['workspaceId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_ORGANIZATION: {
          METHOD: METHODS.GET,
          FULL_PATH: 'project/workspace/:workspaceId/organization/:organizationId/get-all-in-organization',
          DESCRIPTION: 'Получить все project внутри workspace по workspaceId внутри organization по organizationId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['organizationId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'project/workspace/:workspaceId/organization/:organizationId',
          DESCRIPTION: 'Создать project внутри workspace по workspaceId внутри organization по organizationId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['organizationId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: ProjectCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
          DESCRIPTION: 'Обновить project внутри workspace по workspaceId внутри organization по organizationId по projectId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['projectId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: ProjectUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'project/workspace/:workspaceId/organization/:organizationId/project/:projectId',
          DESCRIPTION: 'Удалить project внутри workspace по workspaceId внутри organization по organizationId по projectId',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['projectId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ProjectDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC handbook/workspace/:workspaceId/handbook/:handbookId
    HANDBOOK: {
      ROOT_PATH: 'handbook',
      DESCRIPTION_ENTITY: 'Роуты для работы с справочниками внутри рабочих пространств',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'handbook/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Получить один handbook внутри workspace (по workspaceId)',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: HandbookGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'handbook',
          DESCRIPTION: 'Получить все handbook приложения',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: HandbookGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'handbook/workspace/:workspaceId',
          DESCRIPTION: 'Создать handbook внутри workspace (по workspaceId)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: HandbookCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: HandbookCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'handbook/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Обновить handbook внутри workspace (по handbookId)',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: HandbookUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: HandbookUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'handbook/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Удалить handbook внутри workspace (по handbookId)',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: HandbookDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC global-category-material/:globalCategoryMaterialId
    GLOBAL_CATEGORY_MATERIAL: {
      ROOT_PATH: 'global-category-material',
      DESCRIPTION_ENTITY: 'Роуты для работы с глобальными категориями приложения',
      FEATURES: [FEATURES.SEEDS],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'global-category-material/:globalCategoryMaterialId',
          DESCRIPTION: 'Получить одну глобальную категорию материалов в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['globalCategoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: GlobalCategoryMaterialGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'global-category-material',
          DESCRIPTION: 'Получить все глобальные категории материалов в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: GlobalCategoryMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'global-category-material',
          DESCRIPTION: 'Создать одну глобальную категорию материалов в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: GlobalCategoryMaterialCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: GlobalCategoryMaterialCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'global-category-material/:globalCategoryMaterialId',
          DESCRIPTION: 'Обновить одну глобальную категорию материалов в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['globalCategoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: GlobalCategoryMaterialUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: GlobalCategoryMaterialUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'global-category-material/:globalCategoryMaterialId',
          DESCRIPTION: 'Удалить одну глобальную категорию материалов в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['globalCategoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: GlobalCategoryMaterialUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: GlobalCategoryMaterialDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId'
    CATEGORY_MATERIAL: {
      ROOT_PATH: 'category-material',
      DESCRIPTION_ENTITY: 'Роуты для работы с категориями материалов',
      FEATURES: [FEATURES.SEEDS],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
          DESCRIPTION: 'Получить одну категорию материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'category-material',
          DESCRIPTION: 'Получить все категории материалов в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'category-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить все категории материалов внутри handbook в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'category-material/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Создать одну категорию материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: CategoryMaterialCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialGetResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
          DESCRIPTION: 'Обновить категорию материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: CategoryMaterialUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'category-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
          DESCRIPTION: 'Удалить категорию материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId'
    RESPONSIBLE_PARTNER_PRODUCER: {
      ROOT_PATH: 'responsible-partner-producer',
      DESCRIPTION_ENTITY: 'Роуты для работы с поставщиками/производителями',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
          DESCRIPTION: 'Получить одного поставщика',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['responsiblePartnerProducerId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ResponsiblePartnerProducerGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'responsible-partner-producer',
          DESCRIPTION: 'Получить всех поставщиков',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CategoryMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить всех поставщиков внутри handbook в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['responsiblePartnerProducerId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ResponsiblePartnerProducerGetResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Создать одну категорию материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: ResponsiblePartnerProducerCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ResponsiblePartnerProducerCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH:
            'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
          DESCRIPTION: 'Обновить поставщика в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['responsiblePartnerProducerId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: ResponsiblePartnerProducerUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ResponsiblePartnerProducerUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH:
            'responsible-partner-producer/workspace/:workspaceId/handbook/:handbookId/responsible-partner-producer/:responsiblePartnerProducerId',
          DESCRIPTION: 'Удалить поставщика в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['responsiblePartnerProducerId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: ResponsiblePartnerProducerDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC field-type/:fieldTypeId
    FIELD_TYPE: {
      ROOT_PATH: 'field-type',
      DESCRIPTION_ENTITY: 'Роуты для работы с типами полей',
      FEATURES: [FEATURES.SEEDS],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-type/:fieldTypeId',
          DESCRIPTION: 'Получить один тип поля',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldTypeId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldTypeGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-type',
          DESCRIPTION: 'Получить все типы полей',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'field-type',
          DESCRIPTION: 'Создать один тип поля в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: FieldTypeCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldTypeCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'field-type/:fieldTypeId',
          DESCRIPTION: 'Обновить тип поля в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldTypeId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: FieldTypeUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldTypeUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'field-type/:fieldTypeId',
          DESCRIPTION: 'Удалить тип поля в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldTypeId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldTypeDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId
    FIELD_UNIT_MEASUREMENT: {
      ROOT_PATH: 'field-unit-measurement',
      DESCRIPTION_ENTITY: 'Роуты для работы с единицу измерения',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
          DESCRIPTION: 'Получить одну единицу измерения',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldUnitMeasurementId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-unit-measurement',
          DESCRIPTION: 'Получить все единицы измерения',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить все единицы измерения внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId',
          DESCRIPTION: 'Создать одну единицу измерения в handbook в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: FieldUnitMeasurementCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
          DESCRIPTION: 'Обновить одну единицу измерения в handbook в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldUnitMeasurementId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: FieldUnitMeasurementUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'field-unit-measurement/workspace/:workspaceId/handbook/:handbookId/field-unit-measurement/:fieldUnitMeasurementId',
          DESCRIPTION: 'Удалить единицу измерения в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldUnitMeasurementId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldUnitMeasurementDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId
    FIELD_VARIANTS: {
      ROOT_PATH: 'field-variants',
      DESCRIPTION_ENTITY: 'Роуты для работы с вариантами значений для полей категории с типом SELECTOR (Array)',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
          DESCRIPTION: 'Получить один вариант значения SELECTOR',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldVariantsForSelectorFieldTypeId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-variants',
          DESCRIPTION: 'Получить все варианты значений SELECTOR',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'field-variants/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить все варианты значений SELECTOR внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_CATEGORY_MATERIAL: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
          DESCRIPTION: 'Получить все варианты значений SELECTOR внутри category-material внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_FIELD_OF_CATEGORY_MATERIAL: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/get-all-in-field-of-category-material',
          DESCRIPTION: 'Получить все варианты значений SELECTOR внутри field-of-category-material внутри category-material внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldOfCategoryMaterialId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId',
          DESCRIPTION: 'Создать один вариант значения SELECTOR в handbook в fieldOfCategoryMaterialId в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId', 'fieldOfCategoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: FieldVariantsForSelectorFieldTypeCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
          DESCRIPTION: 'Обновить один вариант значения SELECTOR в handbook в fieldOfCategoryMaterialId в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldUnitMeasurementId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: FieldVariantsForSelectorFieldTypeUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH:
            'field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId',
          DESCRIPTION: 'Удалить один вариант значения SELECTOR в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['fieldUnitMeasurementId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC field-variants/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId
    MATERIALS: {
      ROOT_PATH: 'material',
      DESCRIPTION_ENTITY: 'Роуты для работы с материалами',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
          DESCRIPTION: 'Получить один материал',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['materialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'material',
          DESCRIPTION: 'Получить все материалы в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить все материалы внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_CATEGORY_MATERIAL: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
          DESCRIPTION: 'Получить все материалы внутри category-material внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId',
          DESCRIPTION: 'Создать один вариант значения SELECTOR в handbook в fieldOfCategoryMaterialId в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId', 'categoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: MaterialCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
          DESCRIPTION: 'Обновить один материал в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['materialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: MaterialUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId',
          DESCRIPTION: 'Удалить один материал в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['materialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: MaterialDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/field-of-category-material/:fieldOfCategoryMaterialId/field-variants/:fieldVariantsForSelectorFieldTypeId
    CHARACTERISTICS_MATERIAL: {
      ROOT_PATH: 'characteristics-material',
      DESCRIPTION_ENTITY: 'Роуты для работы с характеристиками материала',
      FEATURES: [],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristics-material/:characteristicsMaterialId',
          DESCRIPTION: 'Получить одну характеристику',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['characteristicsMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'characteristics-material',
          DESCRIPTION: 'Получить все характеристики приложения',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_HANDBOOK: {
          METHOD: METHODS.GET,
          FULL_PATH: 'characteristics-material/workspace/:workspaceId/handbook/:handbookId/get-all-in-handbook',
          DESCRIPTION: 'Получить все значения характеристик внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_CATEGORY_MATERIAL: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/get-all-in-category-material',
          DESCRIPTION: 'Получить все характеристики внутри category-material внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['categoryMaterialId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialGetAllResponseDto,
          EFFECTS: [],
        },
        GET_ALL_IN_MATERIAL: {
          METHOD: METHODS.GET,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/get-all-in-material',
          DESCRIPTION: 'Получить все характеристики внутри material внутри category-material внутри handbook',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['materialId'],
            QUERY_PARAMS: [QueryParamsAll],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: FieldVariantsForSelectorFieldTypeGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/related-field-category-material/:fieldCategoryMaterialId',
          DESCRIPTION: 'Создать характеристику материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['handbookId', 'categoryMaterialId', 'materialId', 'fieldCategoryMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: true,
            BODY: CharacteristicsMaterialCreateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS, ADDITIONAL_INFO.RELATED_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristic-material/:characteristicsMaterialId',
          DESCRIPTION: 'Обновить характеристику материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_MEMBERS_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['characteristicsMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: CharacteristicsMaterialUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH:
            'characteristics-material/workspace/:workspaceId/handbook/:handbookId/category-material/:categoryMaterialId/material/:materialId/characteristic-material/:characteristicsMaterialId',
          DESCRIPTION: 'Удалить одну характеристику материала в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD, GUARDS.WORKSPACE_CREATOR_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['characteristicsMaterialId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: CharacteristicsMaterialDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC status-resource/:statusResourceId
    STATUS_RESOURCE: {
      ROOT_PATH: 'status-resource',
      DESCRIPTION_ENTITY: 'Роуты для работы со статусами ресурсов приложения',
      FEATURES: [FEATURES.SEEDS],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'status-resource/:statusResourceId',
          DESCRIPTION: 'Получить один статус ресурса в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusResourceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusResourceGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'status-resource',
          DESCRIPTION: 'Получить все статусы ресурсов в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusResourceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusResourceGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'status-resource',
          DESCRIPTION: 'Создать статус ресурса в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: StatusResourceUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusResourceCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'status-resource/:statusResourceId',
          DESCRIPTION: 'Обновить статус ресурса в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusResourceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: StatusResourceUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusResourceUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'status-resource/:statusResourceId',
          DESCRIPTION: 'Удалить статус ресурса в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusResourceId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusResourceDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
    //DOC status-approve/:statusApproveId
    STATUS_APPROVE: {
      ROOT_PATH: 'status-approve',
      DESCRIPTION_ENTITY: 'Роуты для работы со статусами утверждения сметы заказчиками',
      FEATURES: [FEATURES.SEEDS, FEATURES.AUTOMAPPER],
      ROUTES: {
        GET: {
          METHOD: METHODS.GET,
          FULL_PATH: 'status-approve/:statusApproveId',
          DESCRIPTION: 'Получить один статус утверждения сметы заказчиком в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusApproveId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusApproveGetResponseDto,
          EFFECTS: [],
        },
        GET_ALL: {
          METHOD: METHODS.GET,
          FULL_PATH: 'status-approve',
          DESCRIPTION: 'Получить все статусы статусы утверждения сметы заказчиком в приложении',
          ROLES: [],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusApproveId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusApproveGetAllResponseDto,
          EFFECTS: [],
        },
        CREATE: {
          METHOD: METHODS.POST,
          FULL_PATH: 'status-approve',
          DESCRIPTION: 'Создать статус утверждения сметы заказчиком в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: [],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: StatusApproveUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusApproveCreateResponseDto,
          EFFECTS: [],
        },
        UPDATE: {
          METHOD: METHODS.PUT,
          FULL_PATH: 'status-approve/:statusApproveId',
          DESCRIPTION: 'Обновить статус утверждения сметы заказчиком в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusApproveId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: StatusApproveUpdateRequestDto,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusApproveUpdateResponseDto,
          EFFECTS: [],
        },
        DELETE: {
          METHOD: METHODS.DELETE,
          FULL_PATH: 'status-approve/:statusApproveId',
          DESCRIPTION: 'Удалить статус утверждения сметы заказчиком в приложении',
          ROLES: [USER_ROLES.ADMIN],
          MIDDLEWARES: {
            GUARDS: [GUARDS.AUTH_GUARD],
            INTERCEPTORS: [],
            PIPES: [],
            FILTERS: [],
          },
          REQUEST_INFO: {
            HEADERS: [],
            PARAMS: ['statusApproveId'],
            QUERY_PARAMS: [],
            USER_FROM_JWT: false,
            BODY: null,
            ADDITIONS: [ADDITIONAL_INFO.URL_PARAMS],
          },
          RESPONSE: StatusApproveDeleteResponseDto,
          EFFECTS: [],
        },
      },
    },
  },
};
