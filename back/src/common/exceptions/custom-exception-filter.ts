import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import { ZodError } from 'zod';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.error(JSON.stringify(request.originalUrl));
    console.error('Исключение обработано на верхнем уровне: ', exception);

    if (exception instanceof ForbiddenException) {
      return response.status(status).json({
        data: null,
        statusCode: status,
        message: exception.message,
        errors: [JSON.stringify(exception.stack)],
      });
    } else if (exception instanceof ZodValidationException) {
      return response.status(status).json({
        data: null,
        statusCode: status,
        message: exception.message,
        errors: [exception.getZodError()],
      });
    } else if (exception instanceof InternalServerErrorException && exception['error'] instanceof ZodError) {
      return response.status(status).json({
        data: null,
        statusCode: status,
        message: exception.message,
        errors: [exception['error']],
      });
    } else if (exception instanceof BadRequestException) {
      return response.status(status).json({
        data: null,
        statusCode: status,
        message: exception.message,
        errors: [JSON.stringify(exception.stack)],
      });
    } else if (exception['response']) {
      return response.status(status).json(exception['response']);
    } else {
      return response.status(status).json({
        data: null,
        statusCode: status,
        message: exception?.message,
        errors: [JSON.stringify(exception?.stack)],
        // path: request.url,
        // timestamp: new Date().toISOString(),
      });
    }
  }
}
