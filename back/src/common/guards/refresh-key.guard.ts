import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload, IJWTRefreshPayload } from '../types/jwt.payload.interface';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from '../../common/errors/errors-description.backend';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { refreshKeyExtractor } from '../../common/helpers/extractors/refresh-key.extractor';
import { IConfigService } from '../../common/types/main/config.service.interface';

@Injectable()
export class RefreshKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const { refreshToken, jwtSecret } = refreshKeyExtractor(context, this.configService);
      const { uuid } = jwt.verify(refreshToken, jwtSecret) as IJWTRefreshPayload;
      const user = dataInternalExtractor(await this.userService.getFullInfoById(uuid));
      if (!user) {
        throw Error('Login under the user with the appropriate role');
        // return false;
      }
      return true;
    } catch (error) {
      if (error.message === 'Login under the user with the appropriate role') {
        const errorRelogin = {
          name: 'Your role have not got access rights',
          message: 'Login under the user with the appropriate role',
        };
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description}`, errorRelogin);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description,
          [errorRelogin],
        );
        throw new HttpException(response, response.statusCode);
      }

      if (error.message === 'invalid token') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }

      if (error.message === 'invalid signature') {
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description}`, error);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.REFRESH_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }

      if (error.name === 'TokenExpiredError') {
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
  }
}
