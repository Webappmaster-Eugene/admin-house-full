import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof ZodValidationException) {
      response.status(status).json({
        message: exception.message,
      });
    }

    if (exception instanceof InternalServerErrorException && exception['error'] instanceof ZodError) {
      response.status(status).json({
        message: exception.message,
      });
    }

    if (exception instanceof ForbiddenException) {
      response.status(status).json({
        statusCode: status,
        error: exception.name,
        message: exception.message,
      });
    }

    response.status(status).json({
      statusCode: status,
      error: exception.stack,
      message: exception.message,
      // path: request.url,
      // timestamp: new Date().toISOString(),
    });
  }
}
