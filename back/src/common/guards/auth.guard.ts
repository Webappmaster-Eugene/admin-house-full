import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';
import { PrismaService } from '../../prisma/prisma.service';
import { IPrismaService } from '../types/main/prisma.interface';
import { KEYS_FOR_INJECTION } from '../utils/di';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private prismaService: IPrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles =
      this.reflector.getAllAndOverride('roles', [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      const payload = jwt.verify(token, jwtSecret) as IJWTPayload;
      console.log(payload);
      const user = await this.prismaService.user.findUnique({
        where: {
          uuid: payload.uuid,
        },
        select: {
          role: {
            select: {
              uuid: true,
              name: true,
            },
          },
        },
      });

      if (!user) {
        return false;
      }

      if (roles?.length === 0 && user) {
        return true;
      }

      return !!roles.includes(user.role.name);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
