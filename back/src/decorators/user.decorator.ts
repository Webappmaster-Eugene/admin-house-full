import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserInfoAccessToken {
  email: string;
  id: number;
  iat: number;
  exp: number;
}

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  console.log(request);
  return request?.user;
});
