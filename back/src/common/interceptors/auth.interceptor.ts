import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { KFI } from '../../common/utils/di';
import { IAuthService } from '../../modules/auth/types/auth.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ILogger } from '../../common/types/main/logger.interface';
import { jwtExtractor } from '../../common/helpers/extractors/jwt.extractor';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { COOKIE_KEYS } from '../../common/consts/cookie-keys';

export class AuthInterceptor implements NestInterceptor {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.AUTH_SERVICE) private authService: IAuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');

    const { token, jwtSecret } = jwtExtractor(context, this.configService);
    const oldRefreshToken = request.cookies[COOKIE_KEYS.REFRESH_KEY];
    console.log('AuthInterceptor used');
    if (oldRefreshToken) {
      try {
        jwt.verify(oldRefreshToken, jwtSecret) as IJWTPayload; // верификация refreshToken
      } catch (error) {
        this.logger.error(`Проблема с токеном oldRefreshToken ` + error);
        return handler.handle();
      }

      try {
        jwt.verify(token, jwtSecret) as IJWTPayload; // верификация accessToken
      } catch (error) {
        this.logger.error(`Проблема с токеном oldAccessToken ` + error);

        const { accessToken, refreshToken } = dataInternalExtractor(
          await this.authService.refreshKeys(request, context.switchToHttp().getResponse()),
        );
        // request.headers[HEADER_KEYS.AUTHORIZATION_HEADER] = `Bearer ${accessToken}`;
        // request.cookies[COOKIE_KEYS.REFRESH_KEY] = refreshToken;
        response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshToken, { domain: frontendDomain });
        response.cookie(COOKIE_KEYS.NEW_ACCESS_KEY, `Bearer ${accessToken}`, { domain: frontendDomain });
        response.cookie(COOKIE_KEYS.LAST_INTERCEPTOR_UPDATE, new Date().toJSON(), { domain: frontendDomain });
        this.logger.error(`Произошла подмена токенов `, error);
        // this.logger.log(`Для запроса произошла подмена токенов: ${accessToken} и ${refreshToken}`);
      }
    }

    return handler.handle();
  }
}
