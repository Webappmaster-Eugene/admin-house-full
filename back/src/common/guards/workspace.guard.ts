import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';

@Injectable()
export class WorkspaceManagerGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      const payload = jwt.verify(token, jwtSecret) as JWTPayload;
      const user = await this.prismaService.user.findUnique({
        where: {
          uuid: payload.uuid,
        },
        select: {
          uuid: true,
          role: {
            select: {
              idRole: true,
            },
          },
          creatorOfWorkspace: {
            select: {
              uuid: true,
              name: true,
              workspaceCreatorUuid: true,
              workspaceMembers: true,
            },
          },
        },
      });

      if (!user) {
        return false;
      }

      return (
        user.role.idRole === 2 &&
        user.uuid === user.creatorOfWorkspace.workspaceCreatorUuid
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
