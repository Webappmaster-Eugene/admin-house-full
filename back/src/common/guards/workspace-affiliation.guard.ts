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
import { dataInternalExtractor } from '../helpers/extractors/data-internal.extractor';
import { IConfigService } from 'src/common/types/main/config.service.interface';
import { BACKEND_ERRORS, BackendErrorNames } from 'src/common/errors/errors-description.backend';
import { ExternalResponse } from 'src/common/types/responses/universal-external-response.interface';

@Injectable()
export class WorkspaceAffiliationGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE) private userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const { token, jwtSecret } = jwtExtractor(context, this.configService);

    try {
      // DOC достаем uuid from токен
      const { uuid } = jwt.verify(token, jwtSecret) as IJWTPayload;

      const findedUser = dataInternalExtractor(await this.userService.getFullInfoById(uuid));

      if (!findedUser) {
        throw Error('Please, login under the user with the appropriate rights to perform this action');
        // return false;
      }

      // DOC какой id у рассматриваемого пользователя
      const inputUuid = context.switchToHttp().getRequest().params['userId'];

      // DOC или действие совершает ADMIN
      // DOC или пользователь сам себя редактирует/смотрит
      const findedUserRolesIdRoles = findedUser.roles.map(role => role.idRole);
      if (findedUserRolesIdRoles.includes(ROLE_IDS.ADMIN_ROLE_ID) || inputUuid === uuid) {
        return true;
      }

      // DOC или действие совершает менеджер Workspace, в котором находится пользователь
      if (findedUserRolesIdRoles.includes(ROLE_IDS.MANAGER_ROLE_ID)) {
        const manager = findedUser;
        const selectedUser = dataInternalExtractor(await this.userService.getFullInfoById(inputUuid));
        const selectedUserWorkspacesUuids = selectedUser.memberOfWorkspaces.map(workspace => workspace.uuid);
        if (selectedUserWorkspacesUuids.includes(manager.creatorOfWorkspaceUuid)) {
          return true;
        }
      }

      throw Error('Login under the user with the appropriate rights to perform this action');

      // return false;
    } catch (error) {
      if (error.message === 'Login under the user with the appropriate rights to perform this action') {
        const errorTypeUser = {
          name: 'You have not got access rights',
          message: 'Login under the user with the appropriate rights to perform this action',
        };
        this.logger.error(`${BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.WORKSPACE_MISMATCH].error.description}`, errorTypeUser);
        const response = new ExternalResponse(
          null,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.WORKSPACE_MISMATCH].httpCode,
          BACKEND_ERRORS.STANDARD_ERRORS[BackendErrorNames.WORKSPACE_MISMATCH].error.description,
          [errorTypeUser],
        );
        throw new HttpException(response, response.statusCode);
      }

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
