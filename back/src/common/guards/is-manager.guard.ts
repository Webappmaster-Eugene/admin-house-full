import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPrismaService } from '../types/main/prisma.interface';
import { KFI } from '../utils/di';
import { ROLE_IDS } from '../consts/role-ids';
import { ILogger } from '../types/main/logger.interface';
import { jsonStringify } from '../helpers/stringify';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from '../../modules/user/types/user.service.interface';

@Injectable()
export class IsManagerInBodyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // достаем uuid нового потенциального владельца workspace
      const bodyUuid = context.switchToHttp().getRequest().body['uuid'];

      const { data } = await this.userService.getAllInfoById(bodyUuid);

      // новый владелец менеджер?
      return data.role['idRole'] === ROLE_IDS.MANAGER_ROLE_ID;
    } catch (error) {
      this.logger.error(jsonStringify(error));
      return false;
    }
  }
}
