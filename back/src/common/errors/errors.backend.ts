export type BackendError = {
  code: string;
  message: string;
  httpCode: number;
};

// type BackendArrayErrors = {
//   [key: string]: BackendError;
// };

export type BackendArrayErrors = {
  AUTH: {
    AUTH_NOT_REGISTERED: BackendError;
    AUTH_NOT_REGISTERED_WITH_ROLE: BackendError;
    AUTH_NOT_LOGINED: BackendError;
    AUTH_STRICT_KEY_NOT_GENERATED: BackendError;
    AUTH_STRICT_KEY_NOT_GETTED: BackendError;
    AUTH_JWT_NOT_GENERATED: BackendError;
  };
  ROLE: {
    ROLE_NOT_CREATED: BackendError;
    ROLE_NOT_GETTED_BY_ID: BackendError;
    ROLE_NOT_GETTED_BY_VALUE: BackendError;
    ALL_ROLES_NOT_GETTED: BackendError;
    ROLE_NOT_UPDATED: BackendError;
    ROLE_NOT_DELETED: BackendError;
  };
  USER: {
    USER_NOT_CREATED: BackendError;
    USER_NOT_GETTED_BY_ID: BackendError;
    USER_NOT_GETTED_BY_EMAIL: BackendError;
    ALL_USERS_NOT_GETTED: BackendError;
    USER_NOT_UPDATED: BackendError;
    USER_NOT_DELETED: BackendError;
  };
  WORKSPACE: {
    WORKSPACE_NOT_CREATED: BackendError;
    WORKSPACE_NOT_GETTED_BY_ID: BackendError;
    WORKSPACE_NOT_GETTED_BY_MANAGER_ID: BackendError;
    WORKSPACE_OWNER_NOT_CHANGED: BackendError;
    ALL_WORKSPACES_NOT_GETTED: BackendError;
    WORKSPACE_NOT_UPDATED: BackendError;
    WORKSPACE_NOT_DELETED: BackendError;
  };
  ORGANIZATION: {
    ORGANIZATION_NOT_CREATED: BackendError;
    ORGANIZATION_NOT_GETTED_BY_ID: BackendError;
    ALL_ORGANIZATIONS_NOT_GETTED: BackendError;
    ORGANIZATION_NOT_UPDATED: BackendError;
    ORGANIZATION_NOT_DELETED: BackendError;
  };
  HANDBOOK: {
    HANDBOOK_NOT_CREATED: BackendError;
    HANDBOOK_NOT_GETTED_BY_ID: BackendError;
    HANDBOOK_NOT_GETTED_BY_MANAGER_ID: BackendError;
    ALL_HANDBOOKS_NOT_GETTED: BackendError;
    HANDBOOK_NOT_UPDATED: BackendError;
    HANDBOOK_NOT_DELETED: BackendError;
  };
  PROJECT: {
    PROJECT_NOT_CREATED: BackendError;
    PROJECT_NOT_GETTED_BY_ID: BackendError;
    ALL_PROJECTS_NOT_GETTED: BackendError;
    PROJECT_NOT_UPDATED: BackendError;
    PROJECT_NOT_DELETED: BackendError;
  };
  FIELD: {
    FIELD_NOT_CREATED: BackendError;
    FIELD_NOT_GETTED_BY_ID: BackendError;
    ALL_FIELDS_NOT_GETTED: BackendError;
    FIELD_NOT_UPDATED: BackendError;
    FIELD_NOT_DELETED: BackendError;
  };
};

export const BACKEND_ERRORS: BackendArrayErrors = {
  AUTH: {
    AUTH_NOT_REGISTERED: {
      code: 'A001',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
    AUTH_NOT_REGISTERED_WITH_ROLE: {
      code: 'A002',
      message: 'Failed to get role by id due to an error on the server',
      httpCode: 500,
    },
    AUTH_NOT_LOGINED: {
      code: 'A003',
      message: 'Failed to get role by value due to an error on the server',
      httpCode: 500,
    },
    AUTH_STRICT_KEY_NOT_GENERATED: {
      code: 'A004',
      message:
        'Failed to ganerate a new strict key due to an error on the server',
      httpCode: 500,
    },
    AUTH_STRICT_KEY_NOT_GETTED: {
      code: 'A005',
      message: 'Failed to get a new strict key due to an error on the server',
      httpCode: 500,
    },
    AUTH_JWT_NOT_GENERATED: {
      code: 'A006',
      message: 'Failed to generate a new JWT due to an error on the server',
      httpCode: 500,
    },
  },
  ROLE: {
    ROLE_NOT_CREATED: {
      code: 'R001',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_GETTED_BY_ID: {
      code: 'R002',
      message: 'Failed to get role by id due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_GETTED_BY_VALUE: {
      code: 'R003',
      message: 'Failed to get role by value due to an error on the server',
      httpCode: 500,
    },
    ALL_ROLES_NOT_GETTED: {
      code: 'R004',
      message: 'Failed to get all roles due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_UPDATED: {
      code: 'R005',
      message: 'Failed to update role due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_DELETED: {
      code: 'R006',
      message: 'Failed to delete role due to an error on the server',
      httpCode: 500,
    },
  },
  USER: {
    USER_NOT_CREATED: {
      code: 'U001',
      message: 'Failed to create user due to an error on the server',
      httpCode: 500,
    },
    USER_NOT_GETTED_BY_ID: {
      code: 'U002',
      message: 'Failed to get user by id due to an error on the server',
      httpCode: 500,
    },
    USER_NOT_GETTED_BY_EMAIL: {
      code: 'U003',
      message: 'Failed to get user by email due to an error on the server',
      httpCode: 500,
    },
    ALL_USERS_NOT_GETTED: {
      code: 'U004',
      message: 'Failed to get all users due to an error on the server',
      httpCode: 500,
    },
    USER_NOT_UPDATED: {
      code: 'U005',
      message: 'Failed to update user due to an error on the server',
      httpCode: 500,
    },
    USER_NOT_DELETED: {
      code: 'U006',
      message: 'Failed to delete user due to an error on the server',
      httpCode: 500,
    },
  },
  WORKSPACE: {
    WORKSPACE_NOT_CREATED: {
      code: 'W001',
      message: 'Failed to create workspace due to an error on the server',
      httpCode: 500,
    },
    WORKSPACE_NOT_GETTED_BY_ID: {
      code: 'W002',
      message: 'Failed to get workspace by id due to an error on the server',
      httpCode: 500,
    },
    WORKSPACE_NOT_GETTED_BY_MANAGER_ID: {
      code: 'W003',
      message:
        'Failed to get workspace by manager id due to an error on the server',
      httpCode: 500,
    },
    ALL_WORKSPACES_NOT_GETTED: {
      code: 'W004',
      message: 'Failed to get all workspaces due to an error on the server',
      httpCode: 500,
    },
    WORKSPACE_NOT_UPDATED: {
      code: 'W005',
      message: 'Failed to update workspace due to an error on the server',
      httpCode: 500,
    },
    WORKSPACE_NOT_DELETED: {
      code: 'W006',
      message: 'Failed to delete workspace due to an error on the server',
      httpCode: 500,
    },
    WORKSPACE_OWNER_NOT_CHANGED: {
      code: 'W007',
      message: 'Failed to change workspace owner due to an error on the server',
      httpCode: 500,
    },
  },
  ORGANIZATION: {
    ORGANIZATION_NOT_CREATED: {
      code: 'O001',
      message: 'Failed to create organization due to an error on the server',
      httpCode: 500,
    },
    ORGANIZATION_NOT_GETTED_BY_ID: {
      code: 'O002',
      message: 'Failed to get organization by id due to an error on the server',
      httpCode: 500,
    },
    ALL_ORGANIZATIONS_NOT_GETTED: {
      code: 'O004',
      message: 'Failed to get all organizations due to an error on the server',
      httpCode: 500,
    },
    ORGANIZATION_NOT_UPDATED: {
      code: 'O005',
      message: 'Failed to update organization due to an error on the server',
      httpCode: 500,
    },
    ORGANIZATION_NOT_DELETED: {
      code: 'O006',
      message: 'Failed to delete organization due to an error on the server',
      httpCode: 500,
    },
  },
  HANDBOOK: {
    HANDBOOK_NOT_CREATED: {
      code: 'H001',
      message: 'Failed to create handbook due to an error on the server',
      httpCode: 500,
    },
    HANDBOOK_NOT_GETTED_BY_ID: {
      code: 'H002',
      message: 'Failed to get handbook by id due to an error on the server',
      httpCode: 500,
    },
    HANDBOOK_NOT_GETTED_BY_MANAGER_ID: {
      code: 'H003',
      message:
        'Failed to get handbook by manager id due to an error on the server',
      httpCode: 500,
    },
    ALL_HANDBOOKS_NOT_GETTED: {
      code: 'H004',
      message: 'Failed to get all handbooks due to an error on the server',
      httpCode: 500,
    },
    HANDBOOK_NOT_UPDATED: {
      code: 'H005',
      message: 'Failed to update handbook due to an error on the server',
      httpCode: 500,
    },
    HANDBOOK_NOT_DELETED: {
      code: 'H006',
      message: 'Failed to delete handbook due to an error on the server',
      httpCode: 500,
    },
  },
  PROJECT: {
    PROJECT_NOT_CREATED: {
      code: 'P001',
      message: 'Failed to create project due to an error on the server',
      httpCode: 500,
    },
    PROJECT_NOT_GETTED_BY_ID: {
      code: 'P002',
      message: 'Failed to get project by id due to an error on the server',
      httpCode: 500,
    },
    ALL_PROJECTS_NOT_GETTED: {
      code: 'P004',
      message: 'Failed to get all projects due to an error on the server',
      httpCode: 500,
    },
    PROJECT_NOT_UPDATED: {
      code: 'P005',
      message: 'Failed to update project due to an error on the server',
      httpCode: 500,
    },
    PROJECT_NOT_DELETED: {
      code: 'P006',
      message: 'Failed to delete project due to an error on the server',
      httpCode: 500,
    },
  },
  FIELD: {
    FIELD_NOT_CREATED: {
      code: 'F001',
      message: 'Failed to create field due to an error on the server',
      httpCode: 500,
    },
    FIELD_NOT_GETTED_BY_ID: {
      code: 'F002',
      message: 'Failed to get field by id due to an error on the server',
      httpCode: 500,
    },
    ALL_FIELDS_NOT_GETTED: {
      code: 'F004',
      message: 'Failed to get all field due to an error on the server',
      httpCode: 500,
    },
    FIELD_NOT_UPDATED: {
      code: 'F005',
      message: 'Failed to update field due to an error on the server',
      httpCode: 500,
    },
    FIELD_NOT_DELETED: {
      code: 'F006',
      message: 'Failed to delete field due to an error on the server',
      httpCode: 500,
    },
  },
};
