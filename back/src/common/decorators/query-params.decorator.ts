import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export interface IQueryParams {
  take: number;
  skip: number;
}

export const QueryParams = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return { take: request?.query['take'], method: request?.query['skip'] };
});
