import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Method = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request?.method;
});
