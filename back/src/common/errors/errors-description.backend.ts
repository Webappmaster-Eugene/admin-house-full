export type BackendError = {
  innerCode: string;
  error: { name: string; description: string };
  httpCode: number;
};

export const enum BackendPErrorCodes {
  PRISMA_CONFLICT_ERROR = 'P2002',
  PRISMA_INVALID_UUID = 'P2023',
  PRISMA_NOT_FOUND_ERROR = 'P2025',
  PRISMA_RELATIONS_ERROR = 'P2014',
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
  REQUIRED_CHARCS_ARE_EMPTY_ERROR = 'REQUIRED_CHARCS_ARE_EMPTY_ERROR',
  CANT_CHANGE_NAME_MATERIAL_ERROR = 'CANT_CHANGE_NAME_MATERIAL_ERROR',
  USER_ALREADY_HAS_THE_SAME_ROLE = 'USER_ALREADY_HAS_THE_SAME_ROLE',
  USER_IS_ALREADY_IN_THIS_GROUP_ENTITY = 'USER_IS_ALREADY_IN_THIS_GROUP_ENTITY',
  FIELD_TYPE_ERROR = 'FIELD_TYPE_ERROR',
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
    [BackendErrorNames.FIELD_TYPE_ERROR]: BackendError;
    [BackendErrorNames.CANT_CHANGE_NAME_MATERIAL_ERROR]: BackendError;
    [BackendErrorNames.REQUIRED_CHARCS_ARE_EMPTY_ERROR]: BackendError;
    [BackendErrorNames.USER_ALREADY_HAS_THE_SAME_ROLE]: BackendError;
    [BackendErrorNames.USER_IS_ALREADY_IN_THIS_GROUP_ENTITY]: BackendError;
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
        name: 'Error with refresh token (refresh jwt expired)',
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
    [BackendErrorNames.FIELD_TYPE_ERROR]: {
      innerCode: 'S010',
      error: {
        name: 'Field type error in field of category material',
        description:
          'Failed to create new variants for this field of category material due to an error in field type - it must be a selector (array), but its a string or a number',
      },
      httpCode: 400,
    },
    [BackendErrorNames.REQUIRED_CHARCS_ARE_EMPTY_ERROR]: {
      innerCode: 'S011',
      error: {
        name: 'Error of updating info of material - you can only change relations with characteristics',
        description:
          'Required characteristics are empty after created new field of category material. Error of updating info of material - you can only change relations with characteristics to make filled all required characteristics due to required field types',
      },
      httpCode: 400,
    },
    [BackendErrorNames.CANT_CHANGE_NAME_MATERIAL_ERROR]: {
      innerCode: 'S012',
      error: {
        name: 'Error of updating name of material - you can only change etc info due to filled all required characteristics',
        description:
          'Failed to update name of material while all characteristics are filled. Error of updating name of material - you can only change etc info due to filled all required characteristics',
      },
      httpCode: 400,
    },
    [BackendErrorNames.USER_ALREADY_HAS_THE_SAME_ROLE]: {
      innerCode: 'S013',
      error: {
        name: 'Error of updating roles of the user - you can change roles due to already having this role',
        description:
          'Failed to update roles of the user. Error of updating roles of the user - you can change roles due to already having this role',
      },
      httpCode: 400,
    },
    [BackendErrorNames.USER_IS_ALREADY_IN_THIS_GROUP_ENTITY]: {
      innerCode: 'S014',
      error: {
        name: 'Error of creating some group entity of the user due to already be included to this group entity',
        description:
          'Failed to create link of the user. Error of creating some group entity of the user due to already be included to this group entity',
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
