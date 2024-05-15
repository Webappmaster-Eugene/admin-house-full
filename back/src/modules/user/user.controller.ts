import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserUpdateRequestDto, UserUpdateResponseDto } from './dto/controller/update-user.dto';
import { User } from '../../common/decorators/user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { UserEntity } from './entities/user.entity';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import { KFI } from '../../common/utils/di';
import { IUserService } from './types/user.service.interface';
import { UserGetAllResponseDto } from './dto/controller/get-all-users.dto';
import {
  AddUserToOrganizationCommand,
  AddUserToProjectCommand,
  AddUserToWorkspaceCommand,
  UserCreateCommand,
  UserGetAllCommand,
  UserGetCommand,
  UserUpdateCommand,
} from '../../../libs/contracts';
import { UserCreateRequestDto, UserCreateResponseDto } from './dto/controller/create-user.dto';
import { EntityUrlParamCommand } from '../../../libs/contracts/commands/common/entity-url-param.command';
import { UserGetResponseDto } from './dto/controller/get-user.dto';
import { UserDeleteResponseDto } from './dto/controller/delete-user.dto';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { ROLE_IDS } from '../../common/consts/role-ids';
import { WorkspaceAffiliationGuard } from '../../common/guards/workspace-affiliation.guard';
import { EUserTypeVariants } from '@prisma/client';
import { AddUserToWorkspaceRequestDto, AddUserToWorkspaceResponseDto } from './dto/controller/add-to-workspace.dto';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { AddUserToProjectRequestDto, AddUserToProjectResponseDto } from './dto/controller/add-to-project.dto';
import { AddUserToOrganizationRequestDto, AddUserToOrganizationResponseDto } from './dto/controller/add-to-organization.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';
import { errorResponseHandler } from '../../common/helpers/error-response.handler';
import { okResponseHandler } from '../../common/helpers/ok-response.handler';

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
  @Get('/byId/:userId')
  async getByIdEP(
    @Param('userId', ParseUUIDPipe)
    userId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const { ok, data } = await this.userService.getById(userId);
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceAffiliationGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('/byEmail/:email')
  async getByEmailEP(
    @Param('email') userEmail: EntityUrlParamCommand.RequestEmailParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<UserGetResponseDto> {
    try {
      const { ok, data } = await this.userService.getByEmail(userEmail);
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
    // через эту ручку можно зарегистрировать только user с дефолтной ролью
    try {
      const { ok, data } = await this.userService.create(dto, ROLE_IDS.CUSTOMER_ROLE_ID);
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
      return okResponseHandler(ok, data, UserEntity, this.logger);
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
  @UseGuards(AuthGuard)
  @ZodSerializerDto(UserGetResponseDto)
  @Get('/me')
  async getCurrentUserEP(@User() userInfoFromJWT: IJWTPayload, @UrlParams() urlParams: IUrlParams): Promise<UserGetResponseDto> {
    try {
      const { ok, data } = await this.userService.getById(userInfoFromJWT.uuid);
      return okResponseHandler(ok, data, UserEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AddUserToWorkspaceCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Workspace менеджера по workspaceId',
  })
  @ApiResponse({ status: 200, type: AddUserToWorkspaceResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('/add-to-workspace/workspace/:workspaceId')
  // DOC добавить в workspace обычного пользователя
  async addUserToManagerWorkspaceEP(
    @Param('workspaceId', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToWorkspaceRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToWorkspaceResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToManagerWorkspace(workspaceId, dto);
      return okResponseHandler(ok, data, UserEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AddUserToOrganizationCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Organization менеджера по organizationId',
  })
  @ApiResponse({ status: 200, type: AddUserToOrganizationResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('/add-to-organization/workspace/:workspaceId/organization/:organizationId')
  // DOC добавить в organization обычного пользователя
  async addUserToManagerOrganizationEP(
    @Param('workspace', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organization', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToOrganizationRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToOrganizationResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToManagerOrganization(workspaceId, organizationId, dto);
      return okResponseHandler(ok, data, UserEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(AddUserToProjectCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Добавление обычного (WORKER, CUSTOMER) пользователя в Project менеджера по projectId',
  })
  @ApiResponse({ status: 200, type: AddUserToProjectResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Put('/add-to-project/workspace/:workspaceId/organization/:organizationId/project/:projectId')
  // DOC добавить в project обычного пользователя
  async addUserToManagerProjectEP(
    @Param('workspace', ParseUUIDPipe)
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
    @Param('organization', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @Param('project', ParseUUIDPipe)
    projectId: EntityUrlParamCommand.RequestUuidParam,
    @Body() dto: AddUserToProjectRequestDto,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<AddUserToProjectResponseDto> {
    try {
      const { ok, data } = await this.userService.addUserToManagerProject(workspaceId, organizationId, projectId, dto);
      return okResponseHandler(ok, data, UserEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.USER, urlParams);
    }
  }
}
