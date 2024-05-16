import { Body, Controller, Get, HttpCode, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAuthController } from './types/auth.controller.interface';
import { AuthLoginRequestDto, AuthLoginResponseDto } from './dto/controller/auth.login.dto';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { AuthRegisterRequestDto, AuthRegisterResponseDto } from './dto/controller/auth.register.dto';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { IAuthService } from './types/auth.service.interface';
import { KFI } from '../../common/utils/di';
import { AuthLoginCommand, AuthRegisterCommand, AuthRegisterWithRoleCommand } from '@numart/house-admin-contracts';
import { AuthRegisterWithRoleRequestDto, AuthRegisterWithRoleResponseDto } from './dto/controller/auth.register-with-role.dto';
import { AuthGenerateKeyRequestDto, AuthGenerateKeyResponseDto } from './dto/controller/auth.generate-key.dto';
import { AuthGetKeyResponseDto } from './dto/controller/auth.get-key.dto';
import { AuthEntity } from './entities/auth.entity';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EUserTypeVariants } from '.prisma/client';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@ApiTags('Работа с аутентификацией пользователя')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    @Inject(KFI.AUTH_SERVICE)
    private readonly authService: IAuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
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
      const { ok, data } = await this.authService.register(dto);
      return okResponseHandler(ok, data, AuthEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.AUTH, urlParams);
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
    // DOC каждый раз при вызове идет запись в БД в таблицу registerWithRoleKey (то есть обновление) - при успешной регистрации пользователя с ролью НЕ customer
    // DOC иначе вызов данной ручки не происходит
    try {
      const { ok, data } = await this.authService.registerWithRole(dto, {
        roleId,
        registerWithRoleKey,
      });
      return okResponseHandler(ok, data, AuthEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.AUTH, urlParams);
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
      const { ok, data } = await this.authService.login(dto);
      return okResponseHandler(ok, data, AuthEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.AUTH, urlParams);
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
  @Post('/strict-admin-key/generate')
  async generateStrictAdminKeyEP(
    @Body() dto: AuthGenerateKeyRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AuthGenerateKeyResponseDto> {
    // DOC генерация ключа для регистрации с ролью
    // DOC каждый раз при вызове идет запись в БД в таблицу registerWithRoleKey (то есть обновление) - при успешной регистрации пользователя с ролью НЕ customer
    try {
      const { ok, data } = await this.authService.generateStrictAdminKey(dto);
      if (ok) {
        return new ExternalResponse<{ key: string }>(data as { key: string });
      }
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.AUTH, urlParams);
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
    // DOC получение ключа для регистрации с ролью
    // DOC каждый раз при вызове запись берется из БД таблицы registerWithRoleKey
    try {
      const { ok, data } = await this.authService.getStrictAdminKey();
      if (ok) {
        return new ExternalResponse<{ key: string }>(data as { key: string });
      }
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.AUTH, urlParams);
    }
  }
}
