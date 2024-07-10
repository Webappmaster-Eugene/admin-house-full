import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class ServiceError extends Error {
  errorCode: string;
  extMessage: string;
  statusCode: HttpStatus;
  constructor(errorCode: ErrorCode, statusCode: HttpStatus, message: string, extMessage: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.extMessage = extMessage;
  }
}
