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
import { IPrismaService } from '../types/main/prisma.interface';
import { KEYS_FOR_INJECTION } from '../utils/di';
import { ADMIN_ROLE_ID, MANAGER_ROLE_ID } from '../consts/consts';

@Injectable()
export class WorkspaceMembersGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KEYS_FOR_INJECTION.I_PRISMA_SERVICE)
    private prismaService: IPrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      // достаем uuid from токен
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      // кто совершает действие
      const findedUser = await this.prismaService.user.findUnique({
        where: {
          uuid: uuid,
        },
        select: {
          role: {
            select: {
              uuid: true,
              idRole: true,
              name: true,
            },
          },
          memberOfWorkspaceUuid: true,
          creatorOfWorkspaceUuid: true,
        },
      });

      if (!findedUser) {
        return false;
      }

      // или действие совершает ADMIN
      if (findedUser.role.idRole === ADMIN_ROLE_ID) {
        return true;
      }

      // какой id у рассматриваемого workspace
      const inputUuid = context.switchToHttp().getRequest().params[
        'workspaceId'
      ];

      const selectedWorkspace = await this.prismaService.workspace.findUnique({
        where: {
          uuid: inputUuid,
        },
      });

      // или действие совершает менеджер самого Workspace
      // или пользователь, который входит в Workspace
      return (
        findedUser.memberOfWorkspaceUuid === selectedWorkspace.uuid ||
        findedUser.creatorOfWorkspaceUuid ===
          selectedWorkspace.workspaceCreatorUuid
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
