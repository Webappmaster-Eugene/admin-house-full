import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KFI } from '../utils/di';
import { ROLE_IDS } from '../consts/role-ids';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';

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

      const user = dataInternalExtractor(await this.userService.getFullInfoById(bodyUuid));

      // новый владелец менеджер?
      return user.role['idRole'] === ROLE_IDS.MANAGER_ROLE_ID;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
