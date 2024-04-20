import { AuthRegisterRequestDto } from '../dto/controller/auth.register.dto';
import { UniversalInternalResponse } from '../../../common/types/responses/universal-internal-response.interface';
import { AuthEntity } from '../entities/auth.entity';
import { AuthGenerateKeyRequestDto } from '../dto/controller/auth.generate-key.dto';
import {
  AuthRegisterWithRoleRequestDto,
  AuthRegisterWithRoleRequestParamDto,
} from '../dto/controller/auth.register-with-role.dto';
import { AuthLoginRequestDto } from '../dto/controller/auth.login.dto';
import { EntityUrlParamCommand } from '../../../../libs/contracts/commands/common/entity-url-param.command';

export interface IAuthService {
  register: (
    dto: AuthRegisterRequestDto,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  registerWithRole: (
    dto: AuthRegisterWithRoleRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  login: (
    dto: AuthLoginRequestDto,
  ) => Promise<UniversalInternalResponse<AuthEntity>>;
  generateJWT: (
    uuid: EntityUrlParamCommand.RequestUuidParam,
    email: string,
    workspaceUuid: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<string>>;
  generateStrictAdminKey: (
    dto: AuthGenerateKeyRequestDto,
  ) => Promise<UniversalInternalResponse<{ key: string }>>;
  getStrictAdminKey: () => Promise<UniversalInternalResponse<{ key: string }>>;
}
