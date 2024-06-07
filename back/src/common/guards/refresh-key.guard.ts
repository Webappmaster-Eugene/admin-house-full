import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IUserService } from 'src/modules/user/types/user.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from 'src/common/errors/errors.backend';
import { ExternalResponse } from 'src/common/types/responses/universal-external-response.interface';
import { refreshKeyExtractor } from 'src/common/helpers/extractors/refresh-key.extractor';
import { IConfigService } from 'src/common/types/main/config.service.interface';

@Injectable()
export class RefreshKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { refreshToken, jwtSecret } = refreshKeyExtractor(context, this.configService);
    try {
      const { uuid } = jwt.verify(refreshToken, jwtSecret) as IJWTPayload;

      const user = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!user) {
        return false;
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
