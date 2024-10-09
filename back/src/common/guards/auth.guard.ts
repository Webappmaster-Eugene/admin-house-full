import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload, IJWTRefreshPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/extractors/jwt.extractor';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from '../../common/errors';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { IAuthService } from '../../modules/auth/types/auth.service.interface';
import { COOKIE_KEYS } from '../../common/consts/cookie-keys';
import { EUserTypeVariants } from '.prisma/client';

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
    const roles: EUserTypeVariants[] = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]) || [];

    const refreshToken = context.switchToHttp().getRequest().cookies[COOKIE_KEYS.REFRESH_KEY];

    if (!refreshToken) {
      this.logger.error(BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description);
      const response = new ExternalResponse(
        null,
        BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
        BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
        [BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED]],
      );
      throw new HttpException(response, response?.statusCode);
    }

    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    // DOC начало проверки accessToken - старт процесса авторизации
    try {
      const verifiedAccessToken = jwt.verify(token, jwtSecret) as IJWTPayload;
    } catch (error) {
      if (error.message === 'jwt malformed') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.message === 'invalid token') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.message === 'invalid signature') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.name === 'TokenExpiredError') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }
    // DOC конец проверки accessToken - старт процесса авторизации

    try {
      const verifiedRefreshToken = jwt.verify(refreshToken, jwtSecret) as IJWTRefreshPayload;
    } catch (error) {
      if (error.message === 'jwt malformed') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.message === 'invalid token') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.message === 'invalid signature') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }

      if (error.name === 'TokenExpiredError') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }

    try {
      const { uuid } = jwt.decode(token) as IJWTPayload;

      const user = dataInternalExtractor(await this.userService.getFullInfoById(uuid));
      if (!user) {
        throw Error('Error! Please, register or login under the user with the appropriate role');
      }

      if (roles?.length === 0) {
        return true;
      }

      const userRoleNames = user.roles.map(role => role.name);
      if (
        !roles.some(role => {
          return userRoleNames.includes(role);
        })
      ) {
        throw Error('Error! Please, register or login under the user with the appropriate role');
      }
      return true;
    } catch (error) {
      if (error.message === 'Error! Please, register or login under the user with the appropriate role') {
        const errorRoles = {
          name: 'Your role have not got access rights',
          message: 'Login under the user with the appropriate role',
        };
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description}`, errorRoles);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description,
          [errorRoles],
        );
        throw new HttpException(response, response?.statusCode);
      }
      if (error.name === 'TokenExpiredError') {
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response?.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
