import { AuthRegisterRequestDto, AuthRegisterResponseDto } from '../dto/controller/auth.register.dto';
import { AuthRegisterWithRoleRequestDto, AuthRegisterWithRoleResponseDto } from '../dto/controller/auth.register-with-role.dto';
import { AuthGenerateKeyRequestDto, AuthGenerateKeyResponseDto } from '../dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from '../dto/controller/auth.get-key.dto';
import { AuthLoginRequestDto, AuthLoginResponseDto } from '../dto/controller/auth.login.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';

export interface IAuthController {
  registerEP: (dto: AuthRegisterRequestDto, urlParams: IUrlParams) => Promise<AuthRegisterResponseDto>;
  registerWithRoleEP: (
    dto: AuthRegisterWithRoleRequestDto,
    roleId: EntityUrlParamCommand.RequestNumberParam,
    registerWithRoleKey: string,
    urlParams: IUrlParams,
  ) => Promise<AuthRegisterWithRoleResponseDto>;
  loginEP: (dto: AuthLoginRequestDto, urlParams: IUrlParams) => Promise<AuthLoginResponseDto>;
  generateStrictAdminKeyEP: (dto: AuthGenerateKeyRequestDto, urlParams: IUrlParams) => Promise<AuthGenerateKeyResponseDto>;
  getStrictAdminKeyEP: (urlParams: IUrlParams) => Promise<AuthGetKeyResponseDto>;
}
