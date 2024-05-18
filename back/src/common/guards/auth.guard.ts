import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/extractors/jwt.extractor';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]) || [];

    const { token, jwtSecret } = jwtExtractor(context, this.configService);
    try {
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      const user = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!user) {
        return false;
      }

      if (roles?.length === 0) {
        return true;
      }

      console.log(roles, user.role);

      return !!roles.includes(user.role['name']);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
