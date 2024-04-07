export type BackendError = {
  code: string;
  message: string;
  httpCode: number;
};

// type BackendArrayErrors = {
//   [key: string]: BackendError;
// };

export type BackendArrayErrors = {
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
  };
  WORKSPACE: {
    WORKSPACE_NOT_CREATED: BackendError;
  };
};

export const BACKEND_ERRORS: BackendArrayErrors = {
  ROLE: {
    ROLE_NOT_CREATED: {
      code: 'R001',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_GETTED_BY_ID: {
      code: 'R002',
      message: 'Failed to get role by id',
      httpCode: 500,
    },
    ROLE_NOT_GETTED_BY_VALUE: {
      code: 'R003',
      message: 'Failed to get role by value',
      httpCode: 500,
    },
    ALL_ROLES_NOT_GETTED: {
      code: 'R004',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_UPDATED: {
      code: 'R005',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
    ROLE_NOT_DELETED: {
      code: 'R006',
      message: 'Failed to create role due to an error on the server',
      httpCode: 500,
    },
  },
  USER: {
    USER_NOT_CREATED: {
      code: 'U001',
      message: 'Failed to create user due to an error on the server',
      httpCode: 500,
    },
  },
  WORKSPACE: {
    WORKSPACE_NOT_CREATED: {
      code: 'W001',
      message: 'Failed to create workspace due to an error on the server',
      httpCode: 500,
    },
  },
};
