import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IAuthController } from './types/auth.controller.interface';
import {
  AuthLoginRequestDto,
  AuthLoginResponseDto,
} from './dto/controller/auth.login.dto';
import {
  ExternalResponse,
  UniversalExternalResponse,
} from '../../common/types/responses/universal-external-response.interface';
import {
  AuthRegisterRequestDto,
  AuthRegisterResponseDto,
} from './dto/controller/auth.register.dto';
import { zodToOpenAPI } from 'nestjs-zod';
import { IConfigService } from '../../common/types/main/config.service.interface';
import { ConfigService } from '@nestjs/config';
import { IAuthService } from './types/auth.service.interface';
import { KEYS_FOR_INJECTION } from '../../common/utils/di';
import { AuthLoginCommand, AuthRegisterCommand } from '../../../libs/contracts';
import {
  AuthRegisterWithRoleRequestDto,
  AuthRegisterWithRoleRequestParamDto,
  AuthRegisterWithRoleResponseDto,
} from './dto/controller/auth.register-with-role.dto';
import {
  AuthGenerateKeyRequestDto,
  AuthGenerateKeyResponseDto,
} from './dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from './dto/controller/auth.get-key.dto';

@ApiTags('Работа с аутентификацией пользователя')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(KEYS_FOR_INJECTION.I_AUTH_SERVICE)
    private readonly authService: IAuthService,
    private readonly configService: ConfigService<IConfigService>,
  ) {}

  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Зарегистрировать обычного пользователя' })
  @ApiResponse({ status: 200, type: AuthRegisterResponseDto })
  @HttpCode(200)
  @Post('/register')
  async registerEP(
    @Body() dto: AuthRegisterRequestDto,
  ): Promise<UniversalExternalResponse<AuthRegisterResponseDto | null>> {
    const responseData = await this.authService.register(dto);
    if (responseData.ok) {
      const ret = new ExternalResponse<AuthRegisterResponseDto>(
        new AuthRegisterResponseDto(responseData.data),
      );
      // console.log(new AuthRegisterResponseDto(responseData.data);
      return ret;
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Зарегистрировать пользователя c ролью ADMIN, MANAGER или WORKER',
  })
  @ApiResponse({ status: 200, type: AuthRegisterResponseDto })
  @HttpCode(200)
  @Post('/register/with-role/:roleId/:registerWithRoleKey')
  async registerWithRoleEP(
    @Body() dto: AuthRegisterWithRoleRequestDto,
    @Param() paramDto: AuthRegisterWithRoleRequestParamDto,
  ): Promise<
    UniversalExternalResponse<AuthRegisterWithRoleResponseDto | null>
  > {
    const responseData = await this.authService.registerWithRole(dto, paramDto);
    if (responseData.ok) {
      return new ExternalResponse<AuthRegisterWithRoleResponseDto>(
        new AuthRegisterWithRoleResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(AuthLoginCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthLoginCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Войти в систему под любым пользователем' })
  @ApiResponse({ status: 200, type: AuthLoginResponseDto })
  @HttpCode(200)
  @Post('/login')
  async loginEP(
    @Body() dto: AuthLoginRequestDto,
  ): Promise<UniversalExternalResponse<AuthLoginResponseDto | null>> {
    const responseData = await this.authService.login(dto);
    if (responseData.ok) {
      return new ExternalResponse<AuthLoginResponseDto>(
        new AuthLoginResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Зарегистрировать обычного пользователя' })
  @ApiResponse({ status: 200, type: AuthGenerateKeyRequestDto })
  @HttpCode(200)
  @Post('/strict-admin-key-generate')
  async generateStrictAdminKeyEP(
    @Body() dto: AuthGenerateKeyRequestDto,
  ): Promise<UniversalExternalResponse<AuthGenerateKeyResponseDto | null>> {
    // генерация ключа для регистрации с ролью
    // каждый раз при вызове идет запись в БД в таблицу registerWithRoleKey (то есть обновление) - при успешной регистрации пользователя с ролью НЕ customer
    // иначе вызов данной ручки не происходит
    const responseData = await this.authService.generateStrictAdminKey(dto);
    if (responseData.ok) {
      return new ExternalResponse<AuthGenerateKeyResponseDto>(
        new AuthGenerateKeyResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }

  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Зарегистрировать обычного пользователя' })
  @ApiResponse({ status: 200, type: AuthGetKeyResponseDto })
  @HttpCode(200)
  @Get('/strict-admin-key')
  async getStrictAdminKeyEP(): Promise<
    UniversalExternalResponse<AuthGetKeyResponseDto | null>
  > {
    // получение ключа для регистрации с ролью
    // каждый при вызове идет запись в БД в таблицу registerWithRoleKey
    const responseData = await this.authService.getStrictAdminKey();
    if (responseData.ok) {
      return new ExternalResponse<AuthGetKeyResponseDto>(
        new AuthGetKeyResponseDto(responseData.data),
      );
    } else {
      const response = new ExternalResponse(
        null,
        responseData.error.httpCode,
        'Internal error',
        [responseData.error],
      );
      throw new HttpException(response, responseData.error.httpCode);
    }
  }
}
