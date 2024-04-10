import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';
import { KEYS_FOR_INJECTION } from '../utils/di';
import { IPrismaService } from '../types/main/prisma.interface';

@Injectable()
export class WorkspaceManagerGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private readonly prismaService: IPrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      const payload = jwt.verify(token, jwtSecret) as IJWTPayload;
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
