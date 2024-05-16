import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationEntity } from './entities/organization.entity';
import { ZodSerializerDto, zodToOpenAPI } from 'nestjs-zod';
import {
  OrganizationCreateCommand,
  OrganizationGetAllCommand,
  OrganizationGetCommand,
  OrganizationUpdateCommand,
} from '@numart/house-admin-contracts';
import { EntityUrlParamCommand } from '@numart/house-admin-contracts/commands/common/entity-url-param.command';
import { KFI } from '../../common/utils/di';
import { IOrganizationService } from './types/organization.service.interface';
import { OrganizationGetAllResponseDto } from './dto/controller/get-all-organizations.dto';
import { OrganizationGetResponseDto } from './dto/controller/get-organization.dto';
import { OrganizationDeleteResponseDto } from './dto/controller/delete-organization.dto';
import { OrganizationUpdateRequestDto, OrganizationUpdateResponseDto } from './dto/controller/update-organization.dto';
import { OrganizationCreateRequestDto, OrganizationCreateResponseDto } from './dto/controller/create-organization.dto';
import { OrganizationDeleteCommand } from '@numart/house-admin-contracts';
import { IJWTPayload } from '../../common/types/jwt.payload.interface';
import { RolesSetting } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { EntityName } from '../../common/types/entity.enum';
import { ILogger } from '../../common/types/main/logger.interface';
import { IUrlParams, UrlParams } from '../../common/decorators/url-params.decorator';
import { WorkspaceCreatorGuard } from '../../common/guards/workspace-creator.guard';
import { WorkspaceMembersGuard } from '../../common/guards/workspace-members.guard';
import { EUserTypeVariants } from '.prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { okResponseHandler } from '../../common/helpers/handlers/ok-response.handler';
import { errorResponseHandler } from '../../common/helpers/handlers/error-response.handler';
import { IQueryParams, QueryParams } from '../../common/decorators/query-params.decorator';

@ApiTags('Работа с Organization пользователей')
@Controller('workspace/:workspaceId/organization')
export class OrganizationController {
  constructor(
    @Inject(KFI.ORGANIZATION_SERVICE)
    private readonly organizationService: IOrganizationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: ILogger,
  ) {}

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationGetCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получение Organization по id' })
  @ApiResponse({ status: 200, type: OrganizationGetResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceMembersGuard)
  @ZodSerializerDto(OrganizationGetResponseDto)
  @Get('/:organizationId')
  async getByIdEP(
    @Param('organizationId')
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<OrganizationGetResponseDto> {
    try {
      const { ok, data } = await this.organizationService.getById(organizationId);
      return okResponseHandler(ok, data, OrganizationEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ORGANIZATION, urlParams);
    }
  }

  //region SWAGGER
  @ApiQuery({
    schema: zodToOpenAPI(OrganizationGetAllCommand.RequestQuerySchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationGetAllCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Получить все Organizations пользователей' })
  @ApiResponse({ status: 200, type: [OrganizationGetAllResponseDto] })
  @ApiBearerAuth('access-token')
  //endregion
  @RolesSetting(EUserTypeVariants.ADMIN)
  @UseGuards(AuthGuard)
  @ZodSerializerDto(OrganizationGetAllResponseDto)
  @Get()
  async getAllEP(@UrlParams() urlParams: IUrlParams, @QueryParams() queryParams?: IQueryParams): Promise<OrganizationGetAllResponseDto> {
    try {
      const { ok, data } = await this.organizationService.getAll(queryParams);
      return okResponseHandler(ok, data, OrganizationEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ORGANIZATION, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(OrganizationCreateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationCreateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Создание Organization' })
  @ApiResponse({ status: 201, type: OrganizationEntity })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(OrganizationCreateResponseDto)
  @Post()
  async createEP(
    @Body() dto: OrganizationCreateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @User() userInfoFromJWT: IJWTPayload,
    @Param('workspaceId')
    workspaceId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationCreateResponseDto> {
    // в param create передается автоматически id Workspace, в котором создается Organization
    try {
      const { ok, data } = await this.organizationService.create(dto, userInfoFromJWT.uuid, workspaceId);
      return okResponseHandler(ok, data, OrganizationEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ORGANIZATION, urlParams);
    }
  }

  //region SWAGGER
  @ApiBody({
    schema: zodToOpenAPI(OrganizationUpdateCommand.RequestSchema),
  })
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationUpdateCommand.ResponseSchema),
  })
  @ApiOperation({ summary: 'Изменение Organization по id Organization' })
  @ApiResponse({ status: 200, type: OrganizationUpdateResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @ZodSerializerDto(OrganizationUpdateResponseDto)
  @Put('/:organizationId')
  async updateByIdEP(
    @Body() dto: OrganizationUpdateRequestDto,
    @UrlParams() urlParams: IUrlParams,
    @Param('organizationId', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<OrganizationUpdateResponseDto> {
    try {
      const { ok, data } = await this.organizationService.updateById(organizationId, dto);
      return okResponseHandler(ok, data, OrganizationEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ORGANIZATION, urlParams);
    }
  }

  //region SWAGGER
  @ApiOkResponse({
    schema: zodToOpenAPI(OrganizationDeleteCommand.ResponseSchema),
  })
  @ApiOperation({
    summary: 'Удаление Organization по id Organization',
  })
  @ApiResponse({ status: 200, type: OrganizationDeleteResponseDto })
  @ApiBearerAuth('access-token')
  //endregion
  @UseGuards(AuthGuard, WorkspaceCreatorGuard)
  @Delete('/:organizationId')
  async deleteByIdEP(
    @Param('organizationId', ParseUUIDPipe)
    organizationId: EntityUrlParamCommand.RequestUuidParam,
    @UrlParams() urlParams: IUrlParams,
  ): Promise<OrganizationDeleteResponseDto> {
    try {
      const { ok, data } = await this.organizationService.deleteById(organizationId);
      return okResponseHandler(ok, data, OrganizationEntity, this.logger);
    } catch (error: unknown) {
      errorResponseHandler(this.logger, error, EntityName.ORGANIZATION, urlParams);
    }
  }
}
