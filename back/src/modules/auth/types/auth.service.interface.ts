import { AuthRegisterRequestDto } from '../dto/controller/auth.register.dto';
import { Response, Request } from 'express';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { AuthEntity } from '../entities/auth.entity';
import { AuthGenerateKeyRequestDto } from '../dto/controller/auth.generate-key.dto';
import { AuthRegisterWithRoleRequestDto, AuthRegisterWithRoleRequestParamDto } from '../dto/controller/auth.register-with-role.dto';
import { AuthLoginRequestDto } from '../dto/controller/auth.login.dto';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { AuthRefreshKeysEntity } from 'src/modules/auth/entities/auth-refresh-keys.entity';

export interface IAuthService {
  register: (dto: AuthRegisterRequestDto, response: Response) => Promise<UniversalInternalResponse<AuthEntity>>;
  registerWithRole: (
    dto: AuthRegisterWithRoleRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
    response: Response,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  login: (dto: AuthLoginRequestDto, response: Response) => Promise<UniversalInternalResponse<AuthEntity>>;
  refreshKeys: (request: Request, response: Response) => Promise<UniversalInternalResponse<AuthRefreshKeysEntity>>;
  generateJWT: (
    uuid: EntityUrlParamCommand.RequestUuidParam,
    email: string,
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<string>>;
  generateStrictAdminKey: (dto: AuthGenerateKeyRequestDto) => Promise<UniversalInternalResponse<{ key: string }>>;
  getStrictAdminKey: () => Promise<UniversalInternalResponse<{ key: string }>>;
}
