import { CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtExtractor } from '../../common/helpers/extractors/jwt.extractor';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ILogger } from '../../common/types/main/logger.interface';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';

export class UserInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService<IConfigService>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { token } = jwtExtractor(context, this.configService);
    let user: IJWTPayload;

    try {
      user = jwt.decode(token) as IJWTPayload;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }

    request.user = user;

    return handler.handle();
  }
}
