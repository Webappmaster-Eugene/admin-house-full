import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KFI } from '../utils/di';
import { ROLE_IDS } from '../consts/role-ids';
import { ILogger } from '../types/main/logger.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from '../../common/errors/errors-description.backend';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';

@Injectable()
export class IsManagerInBodyGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      // DOC достаем uuid нового потенциального владельца workspace
      const bodyUuid = context.switchToHttp().getRequest().body['uuid'];

      const user = dataInternalExtractor(await this.userService.getFullInfoById(bodyUuid));
      const userRolesIdRoles = user.roles.map(role => role.idRole);
      if (userRolesIdRoles.includes(ROLE_IDS.MANAGER_ROLE_ID)) {
        return true;
      }
      throw Error('User in body is not a manager. Please, sent a right uuid of manager user in request');
    } catch (error) {
      if (error.message === 'User in body is not a manager. Please, sent a right uuid of manager user in request') {
        const errorUser = {
          name: 'User in body is not a manager',
          message: 'User in body is not a manager. Please, sent a right uuid of manager user in request',
        };
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.INTERNAL_ERROR].error.description}`, errorUser);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.INTERNAL_ERROR].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.INTERNAL_ERROR].error.description,
          [errorUser],
        );
        throw new HttpException(response, response.statusCode);
      }
      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
