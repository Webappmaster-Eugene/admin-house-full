import { AuthRegisterRequestDto, AuthRegisterResponseDto } from '../dto/controller/auth.register.dto';
import { AuthRegisterWithRoleRequestDto, AuthRegisterWithRoleResponseDto } from '../dto/controller/auth.register-with-role.dto';
import { AuthGenerateKeyRequestDto, AuthGenerateKeyResponseDto } from '../dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from '../dto/controller/auth.get-key.dto';
import { AuthLoginRequestDto, AuthLoginResponseDto } from '../dto/controller/auth.login.dto';
import { IUrlParams } from '../../../common/decorators/url-params.decorator';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { Response, Request } from 'express';
import { AuthRefreshKeysResponseDto } from '../dto/controller/auth.refresh-keys.dto';

export interface IAuthController {
  registerEP: (dto: AuthRegisterRequestDto, urlParams: IUrlParams, response: Response) => Promise<AuthRegisterResponseDto>;
  registerWithRoleEP: (
    dto: AuthRegisterWithRoleRequestDto,
    roleId: EntityUrlParamCommand.RequestNumberParam,
    registerWithRoleKey: string,
    urlParams: IUrlParams,
    response: Response,
  ) => Promise<AuthRegisterWithRoleResponseDto>;
  refreshKeysEP: (urlParams: IUrlParams, request: Request, response: Response) => Promise<AuthRefreshKeysResponseDto>;
  loginEP: (dto: AuthLoginRequestDto, urlParams: IUrlParams, response: Response) => Promise<AuthLoginResponseDto>;
  generateStrictAdminKeyEP: (dto: AuthGenerateKeyRequestDto, urlParams: IUrlParams) => Promise<AuthGenerateKeyResponseDto>;
  getStrictAdminKeyEP: (urlParams: IUrlParams) => Promise<AuthGetKeyResponseDto>;
}
