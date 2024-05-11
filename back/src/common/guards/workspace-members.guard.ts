import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/jwt.extractor';
import { IPrismaService } from '../types/main/prisma.interface';
import { KFI } from '../utils/di';
import { ROLE_IDS } from '../consts/role-ids';
import { ILogger } from '../types/main/logger.interface';
import { jsonStringify } from '../helpers/stringify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { IWorkspaceService } from '../../modules/workspace/types/workspace.service.interface';

@Injectable()
export class WorkspaceMembersGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(KFI.WORKSPACE_SERVICE) private workspaceService: IWorkspaceService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      // достаем uuid from токен
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      // кто совершает действие
      const findedUser = await this.userService.getAllInfoById(uuid);

      if (!findedUser) {
        return false;
      }

      // или действие совершает ADMIN
      if (findedUser.data.role['idRole'] === ROLE_IDS.ADMIN_ROLE_ID) {
        return true;
      }

      // какой id у рассматриваемого workspace
      const inputWorkspaceUuid = context.switchToHttp().getRequest().params['workspaceId'];

      const selectedWorkspace = await this.workspaceService.getById(inputWorkspaceUuid);

      // или действие совершает менеджер самого Workspace
      // или пользователь, который входит в Workspace
      return (
        findedUser.data.memberOfWorkspaceUuid === selectedWorkspace.data.uuid ||
        findedUser.data.creatorOfWorkspaceUuid === selectedWorkspace.data.uuid
      );
    } catch (error) {
      this.logger.error(jsonStringify(error));
      return false;
    }
  }
}
