import { Inject, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './types/auth.service.interface';
import { AuthEntity } from './entities/auth.entity';
import { KFI } from '../../common/utils/di';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { InternalResponse, UniversalInternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { IUserService } from '../user/types/user.service.interface';
import { AuthRegisterRequestDto } from './dto/controller/auth.register.dto';
import { BackendErrorNames, InternalError } from '../../common/errors/errors.backend';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { AuthGenerateKeyRequestDto } from './dto/controller/auth.generate-key.dto';
import { IAuthRepository } from './types/auth.repository.interface';
import { AuthLoginRequestDto } from './dto/controller/auth.login.dto';
import { AuthRegisterWithRoleRequestParamDto } from './dto/controller/auth.register-with-role.dto';
import { IRoleService } from '../roles/types/role.service.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { tokenRegex } from '../../common/regex/token.regex';
import { dataInternalExtractor } from '../../common/helpers/data-internal.extractor';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(KFI.AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly configService: ConfigService<IConfigService>,
    @Inject(KFI.USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(KFI.ROLE_SERVICE)
    private readonly roleService: IRoleService,
  ) {}

  async register(dto: AuthRegisterRequestDto): Promise<UniversalInternalResponse<AuthEntity>> {
    const registeredUser = dataInternalExtractor(await this.userService.create(dto, ROLE_IDS.CUSTOMER_ROLE_ID));
    const newUserRole = dataInternalExtractor(await this.roleService.getById(ROLE_IDS.CUSTOMER_ROLE_ID));

    const accessTokenResponse = await this.generateJWT(registeredUser.uuid, registeredUser.email);

    const accessToken = accessTokenResponse.data;

    const outputEntity = {
      ...registeredUser,
      accessToken,
      roleName: newUserRole.name,
    };
    const user = new AuthEntity(outputEntity);
    return new InternalResponse(user);
  }

  async registerWithRole(
    dto: AuthRegisterRequestDto,
    paramDto: AuthRegisterWithRoleRequestParamDto,
  ): Promise<UniversalInternalResponse<AuthEntity>> {
    const { roleId, registerWithRoleKey } = paramDto;

    const { data } = await this.getStrictAdminKey();

    if (registerWithRoleKey === data.key) {
      const registeredUser = dataInternalExtractor(await this.userService.create(dto, roleId));
      const newUserRole = dataInternalExtractor(await this.roleService.getById(roleId));

      const accessTokenResponse = await this.generateJWT(registeredUser.uuid, registeredUser.email);

      const accessToken = accessTokenResponse.data;

      const outputEntity = {
        ...registeredUser,
        accessToken,
        roleName: newUserRole.name,
      };

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

  async login(dto: AuthLoginRequestDto): Promise<UniversalInternalResponse<AuthEntity>> {
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

    const newUserRole = dataInternalExtractor(await this.roleService.getByUuid(user.roleUuid));
    const accessTokenResponse = dataInternalExtractor(await this.generateJWT(user.uuid, user.email));

    const outputEntity = {
      ...user,
      accessTokenResponse,
      roleName: newUserRole.name,
    };

    return new InternalResponse(outputEntity);
  }

  async generateJWT(uuid: EntityUrlParamCommand.RequestUuidParam, email: string): Promise<UniversalInternalResponse<string>> {
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

    return new InternalResponse(token);
  }

  async generateStrictAdminKey(dto: AuthGenerateKeyRequestDto): Promise<UniversalInternalResponse<{ key: string }>> {
    const { key } = dto;
    if (key === this.configService.get('KEY_SECRET_FOR_STRICT_ADMIN_KEY')) {
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
