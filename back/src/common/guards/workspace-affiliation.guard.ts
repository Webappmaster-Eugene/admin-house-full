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

@Injectable()
export class WorkspaceAffiliationGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      // достаем uuid from токен
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      const findedUser = await this.userService.getAllInfoById(uuid);

      if (!findedUser) {
        return false;
      }

      // какой id у рассматриваемого пользователя
      const inputUuid = context.switchToHttp().getRequest().params['userId'];

      // или действие совершает ADMIN
      // или пользователь сам себя редактирует/смотрит
      if (findedUser.data.role['idRole'] === ROLE_IDS.ADMIN_ROLE_ID || inputUuid === uuid) {
        return true;
      }

      // или действие совершает менеджер Workspace, в котором находится пользователь
      if (findedUser.data.role['idRole'] === ROLE_IDS.MANAGER_ROLE_ID) {
        const manager = findedUser;
        const selectedUser = await this.userService.getAllInfoById(inputUuid);
        return selectedUser.data.memberOfWorkspaceUuid === manager.data.creatorOfWorkspaceUuid;
      }
      return false;
    } catch (error) {
      this.logger.error(jsonStringify(error));
      return false;
    }
  }
}
