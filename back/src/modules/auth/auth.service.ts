import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './types/auth.service.interface';
import { AuthEntity } from './entities/auth.entity';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { IConfigService } from '../../common/types/main/config.service.interface';
import {
  InternalResponse,
  UniversalInternalResponse,
} from '../../common/types/responses/universal-internal-response.interface';
import { IUserService } from '../user/types/user.service.interface';
import { AuthRegisterRequestDto } from './dto/controller/auth.register.dto';
import {
  BackendErrorNames,
  InternalError,
} from '../../common/errors/errors.backend';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { AuthGenerateKeyRequestDto } from './dto/controller/auth.generate-key.dto';
import { IAuthRepository } from './types/auth.repository.interface';
import { AuthLoginRequestDto } from './dto/controller/auth.login.dto';
import { AuthRegisterWithRoleRequestParamDto } from './dto/controller/auth.register-with-role.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { DEFAULT_ROLE_ID } from '../../common/consts/consts';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KEYS_FOR_INJECTION.I_USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(KEYS_FOR_INJECTION.I_ROLE_SERVICE)
    private readonly roleService: IRoleService,
  ) {}

  async register(
    dto: AuthRegisterRequestDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    const registeredUser = await this.userService.create(dto, DEFAULT_ROLE_ID);
    const newUserRole = await this.roleService.getById(DEFAULT_ROLE_ID);

    const accessTokenResponse = await this.generateJWT(
      registeredUser.data.uuid,
      registeredUser.data.email,
    );

    const accessToken = accessTokenResponse.data;
    const infoRegisteredUser = registeredUser.data;

    const outputEntity = {
      ...infoRegisteredUser,
      accessToken,
      roleName: newUserRole.data.name,
    };
    const user = new AuthEntity(outputEntity);
    return new InternalResponse<AuthEntity>(user);
  }

  async registerWithRole(
    dto: AuthRegisterRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    const { roleId, registerWithRoleKey } = paramDto;

    const { data } = await this.getStrictAdminKey();

    if (registerWithRoleKey === data.key) {
      const registeredUser = await this.userService.create(dto, roleId);
      const newUserRole = await this.roleService.getById(roleId);

      const accessTokenResponse = await this.generateJWT(
        registeredUser.data.uuid,
        registeredUser.data.email,
      );

      const accessToken = accessTokenResponse.data;
      const infoRegisteredUser = registeredUser.data;

      const outputEntity = {
        ...infoRegisteredUser,
        accessToken,
        roleName: newUserRole.data.name,
      };

      const generateKeyDto = {
        key: this.configService.get('KEY_SECRET_FOR_STRICT_ADMIN_KEY'),
      };

      await this.generateStrictAdminKey(generateKeyDto);

      const user = new AuthEntity(outputEntity);

      return new InternalResponse<AuthEntity>(user);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.UNAUTHORIZED_ACCESS),
      );
    }
  }

  async login(
    dto: AuthLoginRequestDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    const { email, password } = dto;
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.INVALID_CREDENTIALS),
      );
    }
    const hashedPassword = user.data.password;
    const isValidPassword = await argon2.verify(hashedPassword, password);
    if (!isValidPassword) {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.INVALID_CREDENTIALS),
      );
    }

    const userInfo = user.data;
    const newUserRole = await this.roleService.getByUuid(userInfo.roleUuid);
    const accessTokenResponse = await this.generateJWT(
      userInfo.uuid,
      userInfo.email,
    );
    const accessToken = accessTokenResponse.data;

    const outputEntity = {
      ...userInfo,
      accessToken,
      roleName: newUserRole.data.name,
    };

    return new InternalResponse<AuthEntity>(outputEntity);
  }

  async generateJWT(
    uuid: EntityUrlParamCommand.RequestUuidParam,
    email: string,
  ): Promise<UniversalInternalResponse<string>> {
    const token = jwt.sign(
      {
        uuid,
        email,
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
      const str = `adminHouse-${key}-strict-admin-key`;
      const token = await argon2.hash(str);
      const finalToken = token.replace(/\$|\,|=|\+|\//gm, '');

      const bdIdKey = await this.authRepository.getStrictAdminKey();
      const strictKey = await this.authRepository.generateStrictAdminKey(
        bdIdKey.key,
        finalToken,
      );

      return new InternalResponse<{ key: string }>(strictKey);
    } else {
      throw new InternalResponse(
        null,
        false,
        new InternalError(BackendErrorNames.INTERNAL_ERROR),
      );
    }
  }

  async getStrictAdminKey(): Promise<
    UniversalInternalResponse<{ key: string }>
  > {
    const strictKey = await this.authRepository.getStrictAdminKey();
    return new InternalResponse<{ key: string }>(strictKey);
  }
}
