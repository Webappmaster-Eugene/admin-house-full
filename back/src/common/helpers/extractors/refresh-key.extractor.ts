import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { COOKIE_KEYS } from 'src/common/consts/cookie-keys';
import { IConfigService } from 'src/common/types/main/config.service.interface';

export function refreshKeyExtractor(
  context: ExecutionContext,
  configService: ConfigService<IConfigService>,
): {
  refreshToken: string;
  jwtSecret: string;
} {
  const request = context.switchToHttp().getRequest();
  const refreshToken = request?.cookies[COOKIE_KEYS.REFRESH_KEY];
  const JWT_SECRET_KEY = configService.get('JWT_KEY');

  return { refreshToken: refreshToken, jwtSecret: JWT_SECRET_KEY };
}
