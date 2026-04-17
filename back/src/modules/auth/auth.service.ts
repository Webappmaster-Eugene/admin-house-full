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
import { ForgotPasswordRequestDto } from './dto/controller/auth.forgot-password.dto';
import { VerifyResetCodeRequestDto } from './dto/controller/auth.verify-reset-code.dto';
import { ResetPasswordRequestDto } from './dto/controller/auth.reset-password.dto';
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
import { IMailService } from '../mail/mail.service.interface';
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
    @Inject(KFI.MAIL_SERVICE)
    private readonly mailService?: IMailService,
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

  async forgotPassword(dto: ForgotPasswordRequestDto): Promise<UniversalInternalResponse<{ message: string }>> {
    const { email } = dto;

    // Проверяем, существует ли пользователь с таким email (без исключения при отсутствии)
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      // Не раскрываем, существует ли email — возвращаем успех в любом случае
      return new InternalResponse({ message: 'Если аккаунт с таким email существует, код отправлен на почту' });
    }

    // Удаляем старые/использованные коды для этого email
    await this.authRepository.deleteExpiredResetCodes(email);

    // Генерируем 6-значный код
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 минут

    await this.authRepository.createPasswordResetCode(email, code, expiresAt);

    // Отправляем email
    await this.mailService.sendResetCode(email, code);

    return new InternalResponse({ message: 'Если аккаунт с таким email существует, код отправлен на почту' });
  }

  async verifyResetCode(dto: VerifyResetCodeRequestDto): Promise<UniversalInternalResponse<{ message: string }>> {
    const { email, code } = dto;

    const resetCode = await this.authRepository.findValidResetCode(email, code);
    if (!resetCode) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }

    return new InternalResponse({ message: 'Код подтверждён' });
  }

  async resetPassword(dto: ResetPasswordRequestDto): Promise<UniversalInternalResponse<{ message: string }>> {
    const { email, code, password } = dto;

    // Проверяем код ещё раз
    const resetCode = await this.authRepository.findValidResetCode(email, code);
    if (!resetCode) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }

    // Проверяем, существует ли пользователь
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new InternalResponse(new InternalError(BackendErrorNames.INVALID_CREDENTIALS));
    }

    // Хэшируем новый пароль
    const hashedPassword = await argon2.hash(password);

    // Обновляем пароль пользователя
    await this.authRepository.updateUserPassword(user.uuid, hashedPassword);

    // Помечаем код как использованный
    await this.authRepository.markResetCodeAsUsed(resetCode.uuid);

    return new InternalResponse({ message: 'Пароль успешно изменён' });
  }
}
