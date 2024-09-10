import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
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
import { IConfigService } from '../../common/types/main/config.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from '../../common/errors/errors-description.backend';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';

@Injectable()
export class WorkspaceCreatorGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(KFI.WORKSPACE_SERVICE) private workspaceService: IWorkspaceService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      // DOC достаем uuid from токен
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      // DOC кто совершает действие
      const findedUser = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!findedUser) {
        throw Error('Login under the user with the appropriate role');
        // return false;
      }

      const findedUserRolesIdRoles = findedUser.roles.map(role => role.idRole);

      // DOC или действие совершает ADMIN
      if (findedUserRolesIdRoles.includes(ROLE_IDS.ADMIN_ROLE_ID)) {
        return true;
      }

      // DOC какой id у рассматриваемого workspace
      const inputWorkspaceUuid = context.switchToHttp().getRequest().params['workspaceId'];

      const selectedWorkspace = dataInternalExtractor(await this.workspaceService.getById(inputWorkspaceUuid));

      // DOC или действие совершает менеджер самого Workspace
      if (findedUser.creatorOfWorkspaceUuid === selectedWorkspace.uuid) {
        return true;
      }
      throw Error('Login under the user with the appropriate role');
    } catch (error) {
      if (error.message === 'Login under the user with the appropriate role') {
        const errorRoles = {
          name: 'Your role have not got access rights',
          message: 'Login under the user with the appropriate role',
        };
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description}`, errorRoles);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.UNAUTHORIZED_ACCESS].error.description,
          [errorRoles],
        );
        throw new HttpException(response, response.statusCode);
      }
      if (error.name === 'TokenExpiredError') {
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.ACCESS_KEY_EXPIRED].error.description,
          [error],
        );
        throw new HttpException(response, response.statusCode);
      }

      this.logger.error(JSON.stringify(error));
      return false;
    }
  }
}
