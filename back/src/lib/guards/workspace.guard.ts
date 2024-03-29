import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';

@Injectable()
export class WorkspaceManagerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      const payload = jwt.verify(token, jwtSecret) as JWTPayload;
      const user = await this.prismaService.user.findUnique({
        where: {
          id: Number(payload.id),
        },
        select: {
          id: true,
          roleId: true,
          creator_of_workspace: {
            select: {
              id: true,
              name: true,
              workspaceCreatorId: true,
              workspace_members: true,
            },
          },
        },
      });

      if (!user) {
        return false;
      }

      if (
        user.roleId === 2 &&
        user.id === user.creator_of_workspace.workspaceCreatorId
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
