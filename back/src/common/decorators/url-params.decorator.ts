import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { METHODS } from '../../common/api-description/method.enum';

export interface IUrlParams {
  url: string;
  method: METHODS;
}

export const UrlParams = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return { url: request?.url, method: request?.method };
});
