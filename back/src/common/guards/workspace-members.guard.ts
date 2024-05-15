import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/jwt.payload.interface';
import { jwtExtractor } from '../helpers/extractors/jwt.extractor';
import { KFI } from '../utils/di';
import { ROLE_IDS } from '../consts/role-ids';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { IWorkspaceService } from '../../modules/workspace/types/workspace.service.interface';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';

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
      const findedUser = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!findedUser) {
        return false;
      }

      // или действие совершает ADMIN
      if (findedUser.role['idRole'] === ROLE_IDS.ADMIN_ROLE_ID) {
        return true;
      }

      // какой id у рассматриваемого workspace
      const inputWorkspaceUuid = context.switchToHttp().getRequest().params['workspaceId'];

      const selectedWorkspace = dataInternalExtractor(await this.workspaceService.getById(inputWorkspaceUuid));

      // или действие совершает менеджер самого Workspace
      // или пользователь, который входит в Workspace
      return findedUser.memberOfWorkspaceUuid === selectedWorkspace.uuid || findedUser.creatorOfWorkspaceUuid === selectedWorkspace.uuid;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
