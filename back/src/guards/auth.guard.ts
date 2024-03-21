import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

interface JWTPayload {
  name: string;
  id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles?.length) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split(' ')[1];
      const JWT_KEY = this.configService.get('JWT_KEY');
      try {
        const payload = jwt.verify(token, JWT_KEY) as JWTPayload;
        const user = await this.prismaService.user.findUnique({
          where: {
            id: Number(payload.id),
          },
        });

        if (!user) {
          return false;
        }

        if (roles.length === 0 && user) {
          return true;
        }

        return !!roles.includes(user.user_type);
      } catch (error) {
        return false;
      }
    }
  }
}
