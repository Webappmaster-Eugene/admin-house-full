import { Catch, ArgumentsHost, HttpStatus, Inject } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ServiceError, ErrorCode } from '../errors';
import { Response, Request } from 'express';
import { ObjectUtil } from '../utils/object.util';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ILogger } from 'src/common/types/main/logger.interface';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/common/types/main/config.service.interface';

@Catch()
export class ProcessExceptionsFilter extends BaseExceptionFilter<ServiceError> {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
    private configService: ConfigService<IConfigService>,
  ) {
    super();
  }

  catch(exception: ServiceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof ServiceError) {
      const statusCode = exception.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(statusCode).json({
        errorCode: exception.errorCode ?? ErrorCode.InternalServerError,
        statusCode: statusCode,
        message: exception.extMessage,
        path: request.url,
      });
      this.logger.error(
        `Request: [${request.method}] ${request.protocol}://${request.hostname}${request.originalUrl}. Exception: ${ObjectUtil.deleteKeys(
          exception,
          ['extMessage'],
        )}`,
      );
    } else {
      console.log(host);
      super.catch(exception, host);
    }
  }
}
