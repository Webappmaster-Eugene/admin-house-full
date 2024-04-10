import {
  AuthRegisterRequestDto,
  AuthRegisterResponseDto,
} from '../dto/controller/auth.register.dto';
import { UniversalExternalResponse } from '../../../common/types/responses/universal-external-response.interface';
import {
  AuthRegisterWithRoleRequestDto,
  AuthRegisterWithRoleRequestParamDto,
  AuthRegisterWithRoleResponseDto,
} from '../dto/controller/auth.register-with-role.dto';
import {
  AuthGenerateKeyRequestDto,
  AuthGenerateKeyResponseDto,
} from '../dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from '../dto/controller/auth.get-key.dto';
import {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
} from '../dto/controller/auth.login.dto';

export interface IAuthController {
  registerEP: (
    dto: AuthRegisterRequestDto,
  ) => Promise<UniversalExternalResponse<AuthRegisterResponseDto | null>>;
  registerWithRoleEP: (
    dto: AuthRegisterWithRoleRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ) => Promise<
    UniversalExternalResponse<AuthRegisterWithRoleResponseDto | null>
  >;
  loginEP: (
    dto: AuthLoginRequestDto,
  ) => Promise<UniversalExternalResponse<AuthLoginResponseDto | null>>;
  generateStrictAdminKeyEP: (
    dto: AuthGenerateKeyRequestDto,
  ) => Promise<UniversalExternalResponse<AuthGenerateKeyResponseDto | null>>;
  getStrictAdminKeyEP: () => Promise<
    UniversalExternalResponse<AuthGetKeyResponseDto | null>
  >;
}
