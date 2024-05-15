import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InternalResponse } from '../../types/responses/universal-internal-response.interface';
import { BackendErrorNames, BackendPErrorCodes, InternalError } from '../../errors/errors.backend';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function errorRepositoryHandler(error: unknown): void {
  if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_NOT_FOUND_ERROR) {
    throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
  }

  if (error instanceof PrismaClientKnownRequestError && error.code === BackendPErrorCodes.PRISMA_CONFLICT_ERROR) {
    throw new InternalResponse(new InternalError(BackendErrorNames.CONFLICT_ERROR, error));
  }

  if (error instanceof NotFoundException) {
    throw new InternalResponse(new InternalError(BackendErrorNames.NOT_FOUND, error));
  }

  if (error instanceof UnauthorizedException) {
    throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
  }

  throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR, error));
}
