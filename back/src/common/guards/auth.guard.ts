import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles =
      this.reflector.getAllAndOverride('roles', [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      const payload = jwt.verify(token, jwtSecret) as JWTPayload;
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
