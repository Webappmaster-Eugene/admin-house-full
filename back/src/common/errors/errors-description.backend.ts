export type BackendError = {
  innerCode: string;
  error: { name: string; description: string };
  httpCode: number;
};

export const enum BackendPErrorCodes {
  PRISMA_CONFLICT_ERROR = 'P2002',
  PRISMA_INVALID_UUID = 'P2023',
  PRISMA_NOT_FOUND_ERROR = 'P2025',
}

export const enum BackendErrorNames {
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCESS_KEY_EXPIRED = 'ACCESS_KEY_EXPIRED',
  REFRESH_KEY_EXPIRED = 'REFRESH_KEY_EXPIRED',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  WORKSPACE_MISMATCH = 'WORKSPACE_MISMATCH',
  SKIP_TAKES_TOO_MUCH = 'SKIP_TAKES_TOO_MUCH',
  PRISMA_CONFLICT_ERROR = 'PRISMA_CONFLICT_ERROR',
  PRISMA_INVALID_INPUT = 'PRISMA_INVALID_INPUT',
}

export type BackendArrayErrors = {
  STANDARD_ERRORS: {
    [BackendErrorNames.NOT_FOUND]: BackendError;
    [BackendErrorNames.UNAUTHORIZED_ACCESS]: BackendError;
    [BackendErrorNames.INVALID_CREDENTIALS]: BackendError;
    [BackendErrorNames.ACCESS_KEY_EXPIRED]: BackendError;
    [BackendErrorNames.REFRESH_KEY_EXPIRED]: BackendError;
    [BackendErrorNames.BAD_REQUEST]: BackendError;
    [BackendErrorNames.INTERNAL_ERROR]: BackendError;
    [BackendErrorNames.SKIP_TAKES_TOO_MUCH]: BackendError;
    [BackendErrorNames.WORKSPACE_MISMATCH]: BackendError;
  };
  PRISMA_ERRORS: {
    [BackendErrorNames.PRISMA_CONFLICT_ERROR]: BackendError;
    [BackendErrorNames.PRISMA_INVALID_INPUT]: BackendError;
  };
};

export const BACKEND_ERRORS: BackendArrayErrors = {
  STANDARD_ERRORS: {
    [BackendErrorNames.NOT_FOUND]: {
      innerCode: 'S001',
      error: {
        name: 'Not found',
        description: 'Failed to get requesting info - not found in database',
      },
      httpCode: 404,
    },
    [BackendErrorNames.UNAUTHORIZED_ACCESS]: {
      innerCode: 'S002',
      error: {
        name: 'Error error',
        description: 'Failed to get requesting info - you have not got required access rights',
      },
      httpCode: 403,
    },
    [BackendErrorNames.ACCESS_KEY_EXPIRED]: {
      innerCode: 'S003',
      error: {
        name: 'Error error (access jwt expired)',
        description: 'Your Access JWT-key is expired. Relogin or refresh your pair of tokens.',
      },
      httpCode: 403,
    },
    [BackendErrorNames.REFRESH_KEY_EXPIRED]: {
      innerCode: 'S004',
      error: {
        name: 'Error error (refresh jwt expired)',
        description: 'Your Refresh JWT key is expired. Relogin please.',
      },
      httpCode: 403,
    },
    [BackendErrorNames.INVALID_CREDENTIALS]: {
      innerCode: 'S005',
      error: {
        name: 'Unauthorized error',
        description: 'Failed to get requesting info - you must have right credentials (login and password)',
      },
      httpCode: 401,
    },
    [BackendErrorNames.BAD_REQUEST]: {
      innerCode: 'S006',
      error: {
        name: 'Сlient error',
        description: 'Failed to get info due to an client-side error',
      },
      httpCode: 400,
    },
    [BackendErrorNames.INTERNAL_ERROR]: {
      innerCode: 'S007',
      error: {
        name: 'Internal error',
        description: 'Failed to get info due to an internal server error',
      },
      httpCode: 500,
    },
    [BackendErrorNames.WORKSPACE_MISMATCH]: {
      innerCode: 'S008',
      error: {
        name: 'Workspace mismatch error',
        description:
          'Failed to resolve action due to an mismatch of workspaces. Watch carefully to matching your info with permissions of workspace and matching rights',
      },
      httpCode: 400,
    },
    [BackendErrorNames.SKIP_TAKES_TOO_MUCH]: {
      innerCode: 'S009',
      error: {
        name: 'Skip query takes too much error',
        description: 'Failed to get all entities due to a really big skip query error',
      },
      httpCode: 400,
    },
  },
  PRISMA_ERRORS: {
    [BackendErrorNames.PRISMA_CONFLICT_ERROR]: {
      innerCode: 'P001',
      error: {
        name: 'Prisma conflict error',
        description: 'Failed to create entities due to a db conflict error',
      },
      httpCode: 409,
    },
    [BackendErrorNames.PRISMA_INVALID_INPUT]: {
      innerCode: 'P002',
      error: {
        name: 'Prisma invalid input',
        description: 'Failed to get a requested entities to an error in input UUID - db search error',
      },
      httpCode: 400,
    },
  },
};

export interface IInternalError {
  innerError: BackendError;
}

const isBackendStandardError = (errorName: BackendErrorNames): errorName is BackendErrorNames => {
  return errorName in BACKEND_ERRORS.STANDARD_ERRORS;
};

// const isBackendPrismaError = (errorName: BackendErrorNames): boolean => errorName in BACKEND_ERRORS.PRISMA_ERRORS;

export class InternalError implements IInternalError {
  public innerError: BackendError;

  constructor(errorName: BackendErrorNames, errorDescription?: string | unknown) {
    if (isBackendStandardError(errorName)) {
      this.innerError = BACKEND_ERRORS.STANDARD_ERRORS[errorName];
    } else {
      this.innerError = BACKEND_ERRORS.PRISMA_ERRORS[errorName];
    }

    if (!this.innerError.error.description && errorDescription && typeof errorDescription === 'string') {
      this.innerError.error.description = errorDescription;
    }

    if (!this.innerError.error.description) {
      this.innerError.error.description = errorDescription ? JSON.stringify(errorDescription) : this.innerError.error.description;
    }
    return this;
  }
}
