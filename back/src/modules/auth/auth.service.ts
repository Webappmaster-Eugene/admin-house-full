import { Inject, Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './types/auth.service.interface';
import { AuthEntity } from './entities/auth.entity';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { IUserService } from '../user/types/user.service.interface';
import { AuthRegisterRequestDto } from './dto/controller/auth.register.dto';
import { BackendErrorNames, InternalError } from '../../common/errors/errors-description.backend';
import { AuthGenerateKeyRequestDto } from './dto/controller/auth.generate-key.dto';
import { IAuthRepository } from './types/auth.repository.interface';
import { AuthLoginRequestDto } from './dto/controller/auth.login.dto';
import { AuthRegisterWithRoleRequestParamDto } from './dto/controller/auth.register-with-role.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { tokenRegex } from '../../common/regex/token.regex';
import { dataInternalExtractor } from '../../common/helpers/extractors/data-internal.extractor';
import { TokenType } from '../../common/types/token-type.enum';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { KFI } from '../../common/utils/di';
import { COOKIE_KEYS } from '../../common/consts/cookie-keys';
import { IJWTPayload, IJWTRefreshPayload } from '../../common/types/jwt.payload.interface';
import { AuthRefreshKeysEntity } from '../../modules/auth/entities/auth-refresh-keys.entity';
import { EntityUrlParamCommand } from 'libs/contracts';
import { EActiveStatuses } from '.prisma/client';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(KFI.AUTH_REPOSITORY)
    private readonly authRepository?: IAuthRepository,
    private readonly configService?: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE)
    private readonly userService?: IUserService,
    // @Inject(KFI.ROLE_SERVICE)
    // private readonly roleService: IRoleService,
  ) {}

  async register(dto: AuthRegisterRequestDto, response: Response): Promise<UniversalInternalResponse<AuthEntity>> {
    const registeredUser = dataInternalExtractor(await this.userService.create(dto, [ROLE_IDS.CUSTOMER_ROLE_ID]));
    //const newUserRole = dataInternalExtractor(await this.roleService.getById(ROLE_IDS.CUSTOMER_ROLE_ID));
    const registeredUserRoles = registeredUser.roles.map(role => role.idRole);
    const accessTokenResponse = dataInternalExtractor(
      await this.generateJWT(TokenType.ACCESS, registeredUser.uuid, registeredUser.email, registeredUserRoles),
    );

    const refreshTokenResponse = dataInternalExtractor(
      await this.generateJWT(TokenType.REFRESH, registeredUser.uuid, registeredUser.email, registeredUserRoles, registeredUser.userStatus),
    );

    const outputEntity = {
      ...registeredUser,
      accessToken: accessTokenResponse,
      refreshToken: refreshTokenResponse,
    };
    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    response.cookie(COOKIE_KEYS.NEW_ACCESS_KEY, `Bearer ${accessTokenResponse}`, { domain: frontendDomain });
    response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshTokenResponse, { httpOnly: true, domain: frontendDomain });

    const user = new AuthEntity(outputEntity);
    return new InternalResponse(user);
  }

  async registerWithRole(
    dto: AuthRegisterRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
    response: Response,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    const { roleId, registerWithRoleKey } = paramDto;

    const { key } = dataInternalExtractor(await this.getStrictAdminKey());

    if (registerWithRoleKey === key) {
      const registeredUser = dataInternalExtractor(await this.userService.create(dto, [roleId]));
      const registeredUserRoles = registeredUser.roles.map(role => role.idRole);

      const accessTokenResponse = dataInternalExtractor(
        await this.generateJWT(TokenType.ACCESS, registeredUser.uuid, registeredUser.email, registeredUserRoles),
      );

      const refreshTokenResponse = dataInternalExtractor(
        await this.generateJWT(
          TokenType.REFRESH,
          registeredUser.uuid,
          registeredUser.email,
          registeredUserRoles,
          registeredUser.userStatus,
        ),
      );

      const outputEntity = {
        ...registeredUser,
        accessToken: accessTokenResponse,
        refreshToken: refreshTokenResponse,
      };
      const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
      response.cookie(COOKIE_KEYS.NEW_ACCESS_KEY, `Bearer ${accessTokenResponse}`, { domain: frontendDomain });
      response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshTokenResponse, { httpOnly: true, domain: frontendDomain });

      const generateKeyDto = {
        key: this.configService.get('KEY_SECRET_FOR_STRICT_ADMIN_KEY'),
      };

      await this.generateStrictAdminKey(generateKeyDto);

      const user = new AuthEntity(outputEntity);

      return new InternalResponse(user);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS));
    }
  }

  async refreshKeys(request: Request, response: Response): Promise<UniversalInternalResponse<AuthRefreshKeysEntity>> {
    const refreshToken = await request.cookies[COOKIE_KEYS.REFRESH_KEY];
    let refreshData: null | IJWTRefreshPayload = null;

    if (!refreshToken) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }

    try {
      refreshData = jwt.verify(refreshToken, this.configService.get<string>('JWT_KEY')) as IJWTRefreshPayload;
    } catch (error) {
      throw new InternalResponse(new InternalError(BackendErrorNames.REFRESH_KEY_EXPIRED));
    }
    const { email } = refreshData;

    const existedUser = dataInternalExtractor(await this.userService.getByEmail(email));

    if (!existedUser) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }
    const registeredUserRoles = existedUser.roles.map(role => role.idRole);

    const accessTokenResponse = dataInternalExtractor(
      await this.generateJWT(TokenType.ACCESS, existedUser.uuid, existedUser.email, registeredUserRoles),
    );
    const refreshTokenResponse = dataInternalExtractor(
      await this.generateJWT(TokenType.REFRESH, existedUser.uuid, existedUser.email, registeredUserRoles, existedUser.userStatus),
    );

    const outputEntity = {
      accessToken: accessTokenResponse,
      refreshToken: refreshTokenResponse,
    };
    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    // response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshTokenResponse, { httpOnly: true, domain: frontendDomain, secure: true });
    // response.cookie(COOKIE_KEYS.LAST_INTERCEPTOR_UPDATE, new Date().toJSON(), { domain: frontendDomain });
    response.cookie(COOKIE_KEYS.NEW_ACCESS_KEY, `Bearer ${accessTokenResponse}`, { domain: frontendDomain });
    response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshTokenResponse, { httpOnly: true, domain: frontendDomain });

    return new InternalResponse(outputEntity);
  }

  async login(dto: AuthLoginRequestDto, response: Response): Promise<UniversalInternalResponse<AuthEntity>> {
    const { email, password } = dto;

    const user = dataInternalExtractor(await this.userService.getByEmail(email));
    if (!user) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }

    const hashedPassword = user.password;
    const isValidPassword = await argon2.verify(hashedPassword, password);

    if (!isValidPassword) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }
    const loginedUserRoles = user.roles.map(role => role.idRole);

    const accessTokenResponse = dataInternalExtractor(await this.generateJWT(TokenType.ACCESS, user.uuid, user.email, loginedUserRoles));
    const refreshTokenResponse = dataInternalExtractor(
      await this.generateJWT(TokenType.REFRESH, user.uuid, user.email, loginedUserRoles, user.userStatus),
    );

    const outputEntity = {
      ...user,
      accessToken: accessTokenResponse,
      refreshToken: refreshTokenResponse,
    };

    const frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN');
    response.cookie(COOKIE_KEYS.NEW_ACCESS_KEY, `Bearer ${accessTokenResponse}`, { domain: frontendDomain });
    response.cookie(COOKIE_KEYS.REFRESH_KEY, refreshTokenResponse, { httpOnly: true, domain: frontendDomain });
    return new InternalResponse(outputEntity);
  }

  async generateJWT(
    tokenType: TokenType = TokenType.ACCESS,
    uuid: EntityUrlParamCommand.RequestUuidParam,
    email: string,
    roleIds: number[],
    userStatus?: EActiveStatuses,
  ): Promise<UniversalInternalResponse<string>> {
    const token = jwt.sign(
      {
        uuid,
        email,
        roleIds,
        userStatus,
      },
      this.configService.get('JWT_KEY'),
      {
        expiresIn: tokenType === TokenType.REFRESH ? '1d' : '20d', // 604800(7 суток), 86400(1 сутки)
      },
    );

    return new InternalResponse(token);
  }

  async generateStrictAdminKey(dto: AuthGenerateKeyRequestDto): Promise<UniversalInternalResponse<{ key: string }>> {
    const { key } = dto;
    if (key === this.configService.get<string>('KEY_SECRET_FOR_STRICT_ADMIN_KEY')) {
      const str = `adminHouse-${key}-strict-admin-key`;
      const token = await argon2.hash(str);
      const finalToken = token.replace(tokenRegex, '');

      const bdIdKey = await this.authRepository.getStrictAdminKey();
      const strictKey = await this.authRepository.generateStrictAdminKey(bdIdKey.key, finalToken);

      return new InternalResponse(strictKey);
    } else {
      throw new InternalResponse(new InternalError(BackendErrorNames.INTERNAL_ERROR));
    }
  }

  async getStrictAdminKey(): Promise<UniversalInternalResponse<{ key: string }>> {
    const strictKey = await this.authRepository.getStrictAdminKey();
    return new InternalResponse(strictKey);
  }
}
