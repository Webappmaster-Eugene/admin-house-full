import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InternalResponse } from '../../types/responses/universal-internal-response.interface';
import { BackendErrorNames, BackendPErrorCodes, InternalError } from '../../../common/errors/errors-description.backend';
import { PrismaClientKnownRequestError } from '.prisma/client/runtime/library';

export function errorRepositoryHandler(error: unknown): void {
  if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
    console.error('PRISMA_NOT_FOUND_ERROR' + JSON.stringify(error));
    throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
  }

  if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_CONFLICT_ERROR) {
    console.error('PRISMA_CONFLICT_ERROR' + JSON.stringify(error));
    throw new InternalResponse(new InternalError(BackendErrorNames.PRISMA_CONFLICT_ERROR, error));
  }

  if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_INVALID_UUID) {
    console.error('PRISMA_INVALID_UUID' + JSON.stringify(error));
    throw new InternalResponse(new InternalError(BackendErrorNames.PRISMA_INVALID_INPUT, error));
  }

  if (error instanceof NotFoundException) {
    console.error('NOT_FOUND' + JSON.stringify(error));
    throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
  }

  if (error instanceof UnauthorizedException) {
    console.error('INVALID_CREDENTIALS' + JSON.stringify(error));
    throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
  }

  console.error('INTERNAL_ERROR' + JSON.stringify(error));
  throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
}
