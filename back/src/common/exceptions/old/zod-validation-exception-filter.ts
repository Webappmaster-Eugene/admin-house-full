import { ZodValidationException } from 'nestjs-zod';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ZodValidationException, host: ArgumentsHost) {
    console.log(1111);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    exception.getZodError(); // -> ZodError
    response.status(status).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      error: exception.getZodError(),
      // statusCode: status,
      // timestamp: new Date().toISOString(),
      // path: request.url,
    });
  }
}
