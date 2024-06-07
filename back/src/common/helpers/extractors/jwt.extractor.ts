import { ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from 'src/common/types/main/config.service.interface';

export function jwtExtractor(
  context: ExecutionContext,
  configService: ConfigService<IConfigService>,
): {
  token: string;
  jwtSecret: string;
} {
  const request = context.switchToHttp().getRequest();
  const token = request?.headers?.authorization?.split(' ')[1];
  const JWT_SECRET_KEY = configService.get('JWT_KEY');

  return { token: token, jwtSecret: JWT_SECRET_KEY };
}
