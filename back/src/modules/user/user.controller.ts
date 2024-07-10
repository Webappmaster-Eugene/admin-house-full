import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserUpdateRequestDto, UserUpdateResponseDto } from './dto/controller/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { KFI } from '../../common/utils/di';
import { IUserService } from './types/user.service.interface';
import { UserGetAllResponseDto } from './dto/controller/get-all-users.dto';
import {
  UserAddToOrganizationCommand,
  UserAddToProjectCommand,
  UserAddToWorkspaceCommand,
  UserCreateCommand,
  UserGetAllCommand,
  UserGetCommand,
  UserUpdateCommand,
} from 'libs/contracts';
import { UserCreateRequestDto, UserCreateResponseDto } from './dto/controller/create-user.dto';
import { EntityUrlParamCommand } from 'libs/contracts/commands/common/entity-url-param.command';
import { UserGetResponseDto } from './dto/controller/get-user.dto';
import { UserDeleteResponseDto } from './dto/controller/delete-user.dto';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { WorkspaceAffiliationGuard } from '../../common/guards/workspace-affiliation.guard';
import { EUserTypeVariants } from '.prisma/client';
import { UserAddToWorkspaceRequestDto, UserAddToWorkspaceResponseDto } from './dto/controller/add-to-workspace.dto';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { UserAddToProjectRequestDto, UserAddToProjectResponseDto } from './dto/controller/add-to-project.dto';
import { UserAddToOrganizationRequestDto, UserAddToOrganizationResponseDto } from './dto/controller/add-to-organization.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { UserGetFullInfoResponseDto } from 'src/modules/user/dto/controller/get-full-user-info.dto';

@ApiTags('Работа с пользователями')
@Controller('user')
export class UserController {
  constructor(
    @Inject(KFI.USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('by-id/:userId')
  async getByIdEP(
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const { ok, data } = await this.userService.getById(userId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  // @ApiSecurity('bearer')
  @ApiBearerAuth('access-token')
  @ApiNotFoundResponse({
    description: 'User was not found',
    schema: {
      type: 'object',
      example: { message: 'Cannot GET /api/user/byEmail/admin@mail.ru', error: 'Not Found', statusCode: 404 },
    },
  })
  @ApiBadRequestResponse({
    description: 'Error',
    schema: {
      type: 'object',
      example: { message: 'Error', error: 'Error', statusCode: 400 },
    },
  })
  @ApiInternalServerErrorResponse({
    description: '500. InternalServerError',
    schema: {
      type: 'object',
      example: { message: 'Error', error: 'Error', statusCode: 500 },
    },
  })
  //endregion
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('by-email/:email')
  async getByEmailEP(
    @Param('email') userEmail: EntityUrlParamCommand.RequestEmailParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const { ok, data } = await this.userService.getByEmail(userEmail);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(UserGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [UserGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(UserGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<UserGetAllResponseDto> {
    try {
      const { ok, data } = await this.userService.getAll(queryParams);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(UserCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: UserCreateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserCreateResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  async createEP(@Body() dto: UserCreateRequestDto, @UrlParams() urlParams: IUrlParams): Promise<UserCreateResponseDto> {
    // DOC через эту ручку можно зарегистрировать только user с дефолтной ролью
    try {
      const { ok, data } = await this.userService.create(dto, ROLE_IDS.CUSTOMER_ROLE_ID);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(UserUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение пользователя по его id' })
  @ApiResponse({ status: 200, type: UserUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserUpdateResponseDto)
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @Put('/:userId')
  async updateByIdEP(
    @Body() dto: UserUpdateRequestDto,
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserUpdateResponseDto> {
    try {
      const { ok, data } = await this.userService.updateById(userId, dto);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Удаление пользователя по его id' })
  @ApiResponse({ status: 200, type: UserDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserDeleteResponseDto)
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @Delete('/:userId')
  async deleteByIdEP(
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserDeleteResponseDto> {
    try {
      const { ok, data } = await this.userService.deleteById(userId);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserGetCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Получение текущего пользователя со всей полнотой информации',
  })
  @ApiResponse({ status: 200, type: UserGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserGetFullInfoResponseDto)
  @UseGuards(AuthGuard)
  // @UseInterceptors(AuthInterceptor)
  @Get('me')
  async getCurrentUserEP(@User() userInfoFromJWT: IJWTPayload, @UrlParams() urlParams: IUrlParams): Promise<UserGetFullInfoResponseDto> {
    try {
      console.log('Пользователь находится в системе: ' + JSON.stringify(userInfoFromJWT));
      const { ok, data } = await this.userService.getFullInfoById(userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserAddToWorkspaceCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Workspace менеджера по workspaceId',
  })
  @ApiResponse({ status: 200, type: UserAddToWorkspaceResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserGetResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('add-to-workspace/workspace/:workspaceId')
  // DOC добавить в workspace обычного пользователя
  async addUserToManagerWorkspaceEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UserAddToWorkspaceRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserAddToWorkspaceResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToWorkspace(workspaceId, dto.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserAddToOrganizationCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Organization менеджера по organizationId',
  })
  @ApiResponse({ status: 200, type: UserAddToOrganizationResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserGetResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('add-to-organization/workspace/:workspaceId/organization/:organizationId')
  // DOC добавить в organization обычного пользователя
  async addUserToManagerOrganizationEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organizationId', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UserAddToOrganizationRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserAddToOrganizationResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToOrganization(workspaceId, organizationId, dto.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(UserAddToProjectCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Project менеджера по projectId',
  })
  @ApiResponse({ status: 200, type: UserAddToProjectResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @ZodSerializerDto(UserGetResponseDto)
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('add-to-project/workspace/:workspaceId/organization/:organizationId/project/:projectId')
  // DOC добавить в project обычного пользователя
  async addUserToManagerProjectEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organizationId', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Param('projectId', ParseUUIDPipe)
    projectId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: UserAddToProjectRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserAddToProjectResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToProject(workspaceId, organizationId, projectId, dto.uuid);
      return okResponseHandler(ok, data, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }
}
