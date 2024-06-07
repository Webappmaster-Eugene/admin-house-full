import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/extractors/jwt.extractor';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IUserService } from 'src/modules/user/types/user.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from 'src/common/errors/errors.backend';
import { ExternalResponse } from 'src/common/types/responses/universal-external-response.interface';
import { IConfigService } from 'src/common/types/main/config.service.interface';
import { IAuthService } from 'src/modules/auth/types/auth.service.interface';
import { COOKIE_KEYS } from 'src/common/consts/cookie-keys';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(KFI.AUTH_SERVICE) private authService: IAuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]) || [];

    const refreshToken = context.switchToHttp().getRequest().cookies[COOKIE_KEYS.REFRESH_KEY];
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    if (!refreshToken) {
      return false;
    }

    try {
      jwt.verify(refreshToken, jwtSecret) as IJWTPayload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }

    try {
      const { uuid } = jwt.decode(token) as IJWTPayload;

      const user = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!user) {
        return false;
      }

      if (roles?.length === 0) {
        return true;
      }

      return !!roles.includes(user.role['name']);
    } catch (error) {
      this.logger.error('3223424234');
      if (error.name === 'TokenExpiredError') {
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }
      this.logger.error(error);
      return false;
    }

    return true;
  }
}
