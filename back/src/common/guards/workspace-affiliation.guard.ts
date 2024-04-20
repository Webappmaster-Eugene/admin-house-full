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
export class WorkspaceAffiliationGuard implements CanActivate {
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

      // какой id у рассматриваемого пользователя
      const inputUuid = context.switchToHttp().getRequest().params['userId'];

      // или действие совершает ADMIN
      // или пользователь сам себя редактирует/смотрит
      if (findedUser.role.idRole === ADMIN_ROLE_ID || inputUuid === uuid) {
        return true;
      }

      // или действие совершает менеджер Workspace, в котором находится пользователь
      if (findedUser.role.idRole === MANAGER_ROLE_ID) {
        const manager = findedUser;
        const selectedUser = await this.prismaService.user.findUnique({
          where: {
            uuid: inputUuid,
          },
        });
        return (
          selectedUser.memberOfWorkspaceUuid === manager.creatorOfWorkspaceUuid
        );
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
