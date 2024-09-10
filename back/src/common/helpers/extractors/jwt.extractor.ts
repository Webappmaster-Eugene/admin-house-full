import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from '../../types/main/config.service.interface';

export function jwtExtractor(
  context: ExecutionContext,
  configService: ConfigService<IConfigService>,
): {
  token: string;
  jwtSecret: string;
} {
  const request = context.switchToHttp().getRequest();
  const authHeaderSplitted = request?.headers?.authorization?.split(' ');
  const JWT_SECRET_KEY = configService.get<string>('JWT_KEY');

  if (authHeaderSplitted) {
    const token = authHeaderSplitted[authHeaderSplitted?.length - 1];

    return { token: token, jwtSecret: JWT_SECRET_KEY };
  } else {
    return { token: 'bad_token', jwtSecret: JWT_SECRET_KEY };
  }
}
