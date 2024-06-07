import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IAuthHeader {
  Authorization: string;
}

export type TAuthHeader = string;

export const AuthHeader = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const headers = context.switchToHttp().getRequest().headers;
  const headerAuthorization: TAuthHeader = headers['Authorization'];
  return headerAuthorization;
});
