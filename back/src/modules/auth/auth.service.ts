import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './types/auth.service.interface';
import { AuthEntity } from './entities/auth.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { ILogger } from '../../common/types/main/logger.interface';
import { IConfigService } from '../../common/types/main/config.service.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { IUserService } from '../user/types/user.service.interface';
import { AuthRegisterRequestDto } from './dto/controller/auth.register.dto';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { AuthGenerateKeyRequestDto } from './dto/controller/auth.generate-key.dto';
import { IAuthRepository } from './types/auth.repository.interface';
import { AuthLoginRequestDto } from './dto/controller/auth.login.dto';
import { AuthRegisterWithRoleRequestParamDto } from './dto/controller/auth.register-with-role.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    @Inject(KEYS_FOR_INJECTION.I_LOGGER) private readonly logger: ILogger,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  async register(
    dto: AuthRegisterRequestDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    try {
      const registeredUser = await this.userService.create(dto, 4);
      const accessTokenResponse = await this.generateJWT(
        registeredUser.data.email,
        registeredUser.data.uuid,
      );

      const accessToken = accessTokenResponse.data;
      const infoRegisteredUser = registeredUser.data;

      const outputEntity = { ...infoRegisteredUser, accessToken };
      const user = new AuthEntity(outputEntity);
      return new InternalResponse<AuthEntity>(user);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.AUTH.AUTH_NOT_REGISTERED,
      );
    }
  }

  async registerWithRole(
    dto: AuthRegisterRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    try {
      const registeredUser = await this.userService.create(dto);
      const accessTokenResponse = await this.generateJWT(
        registeredUser.data.email,
        registeredUser.data.uuid,
      );

      const accessToken = accessTokenResponse.data;
      const infoRegisterdUser = registeredUser.data;

      const outputEntity = { ...infoRegisterdUser, accessToken };

      return new InternalResponse<AuthEntity>(outputEntity);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.AUTH.AUTH_NOT_REGISTERED,
      );
    }
  }

  async login(
    dto: AuthLoginRequestDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    try {
      const { email, password } = dto;
      const user = await this.userService.getByEmail(email);
      if (!user) {
        //Invalid credentials
        return new InternalResponse(
          null,
          false,
          BACKEND_ERRORS.AUTH.AUTH_NOT_LOGINED,
        );
      }
      const hashedPassword = user.data.password;
      const isValidPassword = await bcrypt.compare(password, hashedPassword);
      if (!isValidPassword) {
        return new InternalResponse(
          null,
          false,
          BACKEND_ERRORS.AUTH.AUTH_NOT_LOGINED,
        );
      }

      const userInfo = user.data;

      const accessTokenResponse = await this.generateJWT(
        userInfo.email,
        userInfo.uuid,
      );
      const accessToken = accessTokenResponse.data;

      const outputEntity = { ...userInfo, accessToken };

      return new InternalResponse<AuthEntity>(outputEntity);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.AUTH.AUTH_NOT_REGISTERED,
      );
    }
  }

  async generateJWT(
    email: string,
    id: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<UniversalInternalResponse<string>> {
    const token = jwt.sign(
      {
        email,
        uuid: id,
      },
      this.configService.get('JWT_KEY'),
      {
        expiresIn: 86400,
      },
    );

    return new InternalResponse<string>(token);
  }

  async generateStrictAdminKey(
    dto: AuthGenerateKeyRequestDto,
  ): Promise<UniversalInternalResponse<{ key: string }>> {
    const { key } = dto;
    if (key === this.configService.get('KEY_SECRET_FOR_STRICT_ADMIN_KEY')) {
      try {
        const str = `adminHouse-${key}-strict-admin-key`;
        const token = await bcrypt.hash(str, 10);
        const strictKey =
          await this.authRepository.generateStrictAdminKey(token);

        return new InternalResponse<{ key: string }>(strictKey);
      } catch (error: unknown) {
        return new InternalResponse(
          null,
          false,
          BACKEND_ERRORS.AUTH.AUTH_STRICT_KEY_NOT_GENERATED,
        );
      }
    } else {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.AUTH.AUTH_STRICT_KEY_NOT_GENERATED,
      );
    }
  }

  async getStrictAdminKey(): Promise<
    UniversalInternalResponse<{ key: string }>
  > {
    try {
      const strictKey = await this.authRepository.getStrictAdminKey();
      return new InternalResponse<{ key: string }>(strictKey);
    } catch (error: unknown) {
      return new InternalResponse(
        null,
        false,
        BACKEND_ERRORS.AUTH.AUTH_STRICT_KEY_NOT_GETTED,
      );
    }
  }
}
