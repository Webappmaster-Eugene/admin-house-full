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
  ) => Promise<UniversalInternalResponse<AuthEntity | null>>;
  registerWithRole: (
    dto: AuthRegisterWithRoleRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ) => Promise<UniversalInternalResponse<AuthEntity | null>>;
  login: (
    dto: AuthLoginRequestDto,
  ) => Promise<UniversalInternalResponse<AuthEntity | null>>;
  generateJWT: (
    email: string,
    id: EntityUrlParamCommand.RequestUuidParam,
  ) => Promise<UniversalInternalResponse<string | null>>;
  generateStrictAdminKey: (
    dto: AuthGenerateKeyRequestDto,
  ) => Promise<UniversalInternalResponse<{ key: string } | null>>;
  getStrictAdminKey: () => Promise<
    UniversalInternalResponse<{ key: string } | null>
  >;
}
