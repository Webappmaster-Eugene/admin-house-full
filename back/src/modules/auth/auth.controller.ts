import { Body, Controller, Get, HttpCode, HttpException, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthController } from './types/auth.controller.interface';
import { AuthLoginRequestDto, AuthLoginResponseDto } from './dto/controller/auth.login.dto';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { AuthRegisterRequestDto, AuthRegisterResponseDto } from './dto/controller/auth.register.dto';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { IAuthService } from './types/auth.service.interface';
import { KFI } from '../../common/utils/di';
import { AuthLoginCommand, AuthRegisterCommand, AuthRegisterWithRoleCommand } from '../../../libs/contracts';
import { AuthRegisterWithRoleRequestDto, AuthRegisterWithRoleResponseDto } from './dto/controller/auth.register-with-role.dto';
import { AuthGenerateKeyRequestDto, AuthGenerateKeyResponseDto } from './dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from './dto/controller/auth.get-key.dto';
import { AuthEntity } from './entities/auth.entity';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
import { jsonStringify } from '../../common/helpers/stringify';
import { errorExtractor } from '../../common/helpers/inner-error.extractor';
import { EntityName } from '../../common/types/entity.enum';
import { BACKEND_ERRORS } from '../../common/errors/errors.backend';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EUserTypeVariants } from '@prisma/client';

@ApiTags('Работа с аутентификацией пользователя')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(KFI.AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(KFI.LOGGER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Зарегистрировать обычного пользователя' })
  @ApiResponse({ status: 200, type: AuthRegisterResponseDto })
  //endregion
  @HttpCode(200)
  @ZodSerializerDto(AuthRegisterResponseDto)
  @Post('/register')
  async registerEP(@Body() dto: AuthRegisterRequestDto, @UrlParams() urlParams: IUrlParams): Promise<AuthRegisterResponseDto> {
    try {
      const responseData = await this.authService.register(dto);
      if (responseData.ok) {
        return new ExternalResponse<AuthEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.AUTH, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterWithRoleCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterWithRoleCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Зарегистрировать пользователя c ролью ADMIN, MANAGER или WORKER',
  })
  @ApiResponse({ status: 200, type: AuthRegisterWithRoleResponseDto })
  //endregion
  @HttpCode(200)
  @ZodSerializerDto(AuthRegisterWithRoleResponseDto)
  @Post('/register/with-role/:roleId/:registerWithRoleKey')
  async registerWithRoleEP(
    @Body() dto: AuthRegisterWithRoleRequestDto,
    @Param('roleId', ParseIntPipe) roleId: number,
    @Param('registerWithRoleKey') registerWithRoleKey: string,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AuthRegisterWithRoleResponseDto> {
    // каждый раз при вызове идет запись в БД в таблицу registerWithRoleKey (то есть обновление) - при успешной регистрации пользователя с ролью НЕ customer
    // иначе вызов данной ручки не происходит
    try {
      const responseData = await this.authService.registerWithRole(dto, {
        roleId,
        registerWithRoleKey,
      });
      if (responseData.ok) {
        return new ExternalResponse<AuthEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.AUTH, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(AuthLoginCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthLoginCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Войти в систему под любым пользователем' })
  @ApiResponse({ status: 200, type: AuthLoginResponseDto })
  //endregion
  @HttpCode(200)
  @ZodSerializerDto(AuthLoginResponseDto)
  @Post('/login')
  async loginEP(@Body() dto: AuthLoginRequestDto, @UrlParams() urlParams: IUrlParams): Promise<AuthLoginResponseDto> {
    try {
      const responseData = await this.authService.login(dto);
      if (responseData.ok) {
        return new ExternalResponse<AuthEntity>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        // this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.AUTH, urlParams);
        console.log(statusCode, fullError, message);

        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(AuthRegisterCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Сгенерировать секретный ключ' })
  @ApiResponse({ status: 200, type: AuthGenerateKeyResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @HttpCode(200)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(AuthGenerateKeyResponseDto)
  @Post('/strict-admin-key-generate')
  async generateStrictAdminKeyEP(
    @Body() dto: AuthGenerateKeyRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AuthGenerateKeyResponseDto> {
    // генерация ключа для регистрации с ролью
    // каждый раз при вызове идет запись в БД в таблицу registerWithRoleKey (то есть обновление) - при успешной регистрации пользователя с ролью НЕ customer
    try {
      const responseData = await this.authService.generateStrictAdminKey(dto);
      if (responseData.ok) {
        return new ExternalResponse<{ key: string }>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.AUTH, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AuthRegisterCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить секретный ключ' })
  @ApiResponse({ status: 200, type: AuthGetKeyResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @HttpCode(200)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(AuthGetKeyResponseDto)
  @Get('/strict-admin-key')
  async getStrictAdminKeyEP(@UrlParams() urlParams: IUrlParams): Promise<AuthGetKeyResponseDto> {
    // получение ключа для регистрации с ролью
    // каждый раз при вызове запись берется из БД таблицы registerWithRoleKey
    try {
      const responseData = await this.authService.getStrictAdminKey();

      if (responseData.ok) {
        return new ExternalResponse<{ key: string }>(responseData.data);
      }
    } catch (error) {
      if (error instanceof InternalResponse) {
        this.logger.error(jsonStringify(error.error));
        const { statusCode, fullError, message } = errorExtractor(error, EntityName.AUTH, urlParams);
        const response = new ExternalResponse(null, statusCode, message, [fullError]);
        throw new HttpException(response, response.statusCode);
      }

      return new ExternalResponse(null, error.httpCode, BACKEND_ERRORS.STANDARD.INTERNAL_ERROR.error.description, [error]);
    }
  }
}
