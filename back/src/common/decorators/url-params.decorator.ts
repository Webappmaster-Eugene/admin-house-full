import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { MethodName } from '../types/method.enum';
export interface IUrlParams {
  url: string;
  method: MethodName;
}

export const UrlParams = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return { url: request?.url, method: request?.method };
  },
);
