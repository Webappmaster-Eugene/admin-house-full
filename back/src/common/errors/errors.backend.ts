export type BackendError = {
  innerCode: string;
  error: { name: string; description: string };
  httpCode: number;
};

export const enum BackendErrorNames {
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  WORKSPACE_MISMATCH = 'WORKSPACE_MISMATCH',
}

export type BackendArrayErrors = {
  STANDARD: {
    [BackendErrorNames.NOT_FOUND]: BackendError;
    [BackendErrorNames.CONFLICT_ERROR]: BackendError;
    [BackendErrorNames.UNAUTHORIZED_ACCESS]: BackendError;
    [BackendErrorNames.INVALID_CREDENTIALS]: BackendError;
    [BackendErrorNames.BAD_REQUEST]: BackendError;
    [BackendErrorNames.INTERNAL_ERROR]: BackendError;
    [BackendErrorNames.WORKSPACE_MISMATCH]: BackendError;
  };
};

export const BACKEND_ERRORS: BackendArrayErrors = {
  STANDARD: {
    [BackendErrorNames.NOT_FOUND]: {
      innerCode: 'S001',
      error: {
        name: 'Not found',
        description: 'Failed to get requesting info - not found in database',
      },
      httpCode: 404,
    },
    [BackendErrorNames.CONFLICT_ERROR]: {
      innerCode: 'S002',
      error: {
        name: 'Conflict error',
        description:
          'Failed to create your row database due to the DB conflict',
      },
      httpCode: 409,
    },
    [BackendErrorNames.UNAUTHORIZED_ACCESS]: {
      innerCode: 'S003',
      error: {
        name: 'Forbidden error',
        description:
          'Failed to get requesting info - you have not got required access rights',
      },
      httpCode: 403,
    },
    [BackendErrorNames.INVALID_CREDENTIALS]: {
      innerCode: 'S004',
      error: {
        name: 'Unauthorized error',
        description:
          'Failed to get requesting info - you must have right credentials (login and password)',
      },
      httpCode: 401,
    },
    [BackendErrorNames.BAD_REQUEST]: {
      innerCode: 'S005',
      error: {
        name: 'Сlient error',
        description: 'Failed to get info due to an client-side error',
      },
      httpCode: 400,
    },
    [BackendErrorNames.INTERNAL_ERROR]: {
      innerCode: 'S006',
      error: {
        name: 'Internal error',
        description: 'Failed to get info due to an internal server error',
      },
      httpCode: 500,
    },
    [BackendErrorNames.WORKSPACE_MISMATCH]: {
      innerCode: 'S007',
      error: {
        name: 'Workspace mismatch error',
        description:
          'Failed to resolve action due to an mismatch of workspaces. Watch carefully to matching your info with permissions of workspace and matching rights',
      },
      httpCode: 400,
    },
  },
};

export class InternalError {
  public innerError: BackendError;
  constructor(
    private readonly errorName: BackendErrorNames,
    errorDescription?: string,
  ) {
    this.innerError = BACKEND_ERRORS.STANDARD[errorName];
    console.log(this.innerError);
    if (errorDescription) {
      this.innerError.error.description = errorDescription;
    }
    return this;
  }
}
