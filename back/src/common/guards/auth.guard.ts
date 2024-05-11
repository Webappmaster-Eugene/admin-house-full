import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';
import { ILogger } from '../types/main/logger.interface';
import { jsonStringify } from '../helpers/stringify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { KFI } from '../utils/di';
import { IUserService } from '../../modules/user/types/user.service.interface';

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

      const user = await this.userService.getAllInfoById(uuid);

      if (!user) {
        return false;
      }

      if (roles?.length === 0) {
        return true;
      }

      return !!roles.includes(user.data.role['roleId']);
    } catch (error) {
      this.logger.error(jsonStringify(error));
      return false;
    }
  }
}
